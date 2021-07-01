package shared

import (
	"crypto/md5"
	"fmt"

	"github.com/caiguanhao/goerrbit/app/models"
)

func (c Ctx) RecacheProblem(problem models.Problem) {
	var notices []models.Notice
	c.ModelNotice.Find("WHERE problem_id = $1 ORDER BY created_at ASC", problem.Id).MustQuery(&notices)
	problem.UserAgents = models.ValueWithCountMap{}
	problem.Messages = models.ValueWithCountMap{}
	problem.Hosts = models.ValueWithCountMap{}
	uac := map[string]int{}
	msgc := map[string]int{}
	hostc := map[string]int{}
	for _, notice := range notices {
		ua, msg, host := notice.UserAgentString(), notice.Message, notice.Host()
		uac[ua] += 1
		msgc[msg] += 1
		hostc[host] += 1
	}
	for ua, count := range uac {
		problem.UserAgents[md5String(ua)] = models.ValueWithCount{ua, count}
	}
	for msg, count := range msgc {
		problem.Messages[md5String(msg)] = models.ValueWithCount{msg, count}
	}
	for host, count := range hostc {
		problem.Hosts[md5String(host)] = models.ValueWithCount{host, count}
	}
	if len(notices) > 0 {
		problem.FirstNoticeAt = notices[0].CreatedAt
		problem.LastNoticeAt = notices[len(notices)-1].CreatedAt
		problem.LastNoticeId = notices[len(notices)-1].Id
		problem.Message = notices[0].Message
		problem.Location = notices[0].Location()
	}
	problem.NoticesCount = len(notices)
	c.ModelProblem.Update(
		c.ModelProblem.Permit(
			"UserAgents",
			"Messages",
			"Hosts",
			"FirstNoticeAt",
			"LastNoticeAt",
			"Message",
			"Location",
			"NoticesCount",
		).Filter(problem),
	)("WHERE id = $1", problem.Id).MustExecute()
}

func md5String(i string) string {
	return fmt.Sprintf("%x", md5.Sum([]byte(i)))
}

package apiv3

import (
	"goerrbit/app/controllers/shared"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/gopsql/logger"
	"github.com/gopsql/pgx"
	"github.com/labstack/echo/v4"
)

func TestCreateNotice(t *testing.T) {
	// make database connection
	conn, err := pgx.Open("postgres://localhost:5432/goerrbit?sslmode=disable")
	if err != nil {
		t.Fatal(err)
	}
	defer conn.Close()
	log := logger.StandardLogger
	cm := shared.NewCtxModels(conn, log)

	// find or create app
	a := cm.ModelApp
	apiKey := "example"
	if !a.MustExists("WHERE api_key = $1", apiKey) {
		a.Insert(
			a.Changes(map[string]interface{}{
				"Name":   "Example",
				"ApiKey": apiKey,
			}),
		)().MustExecute()
	}

	// make request
	f, err := os.Open("../../../test/fixtures/api_v3_request.json")
	if err != nil {
		t.Fatal(err)
	}
	defer f.Close()
	req := httptest.NewRequest("POST", "/", f)
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	req.Header.Set("Authorization", "Bearer "+apiKey)
	rec := httptest.NewRecorder()
	e := echo.New()
	c := e.NewContext(req, rec)
	c.SetPath("/api/v3/projects/:id/notices")
	c.SetParamNames("id")
	c.SetParamValues("1")
	ctx := shared.Ctx{Context: c, CtxModels: cm}
	var ctrl noticesCtrl
	err = ctrl.create(ctx)
	if err != nil {
		t.Fatal(err)
	}
	if rec.Code != 201 {
		t.Fatalf("status should be 201, got %d", rec.Code)
	}
}

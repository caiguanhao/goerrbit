dist: bin plugin

bin:
	docker buildx build . \
		--build-arg VERSION=$$(git describe --tags --abbrev=0) \
		--target dist \
		--output dist/ \
		--platform=linux/amd64,linux/arm64,linux/arm/v7,windows/amd64

plugin:
	docker buildx build . \
		--target plugin \
		--output dist/ \
		--platform=linux/amd64

version:
	@test -n "$$(git status --porcelain)" && echo "Error: working tree is not clean." && exit 1 || \
		read -p "Enter New Version (current: $$(git describe --tags --abbrev=0)): " version && \
		(echo "package cli" && echo && \
		echo "const VERSION = \"$$version\"") \
		> app/cli/version.go && \
		git add app/cli/version.go && \
		git commit -m "$$version" && \
		git tag "$$version"

clean:
	rm -rf dist/

.PHONY: dist bin plugin clean version

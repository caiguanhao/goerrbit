dist: bin plugin

bin:
	docker buildx build . \
		--build-arg VERSION=$$(git describe --tags) \
		--target dist \
		--output dist/ \
		--platform=linux/amd64,linux/arm64,linux/arm/v7,windows/amd64

plugin:
	docker buildx build . \
		--target plugin \
		--output dist/ \
		--platform=linux/amd64

version:
	@(echo "package cli" && echo && \
		echo "const VERSION = \"$$(git describe --tags --abbrev=0)\"") \
		> app/cli/version.go

clean:
	rm -rf dist/

.PHONY: dist bin plugin clean version

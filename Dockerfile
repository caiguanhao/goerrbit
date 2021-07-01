# syntax = docker/dockerfile:1.2

# == base ==

FROM --platform=$BUILDPLATFORM golang:1.16-buster AS base
ARG TARGETOS
ARG TARGETARCH
WORKDIR /src
COPY go.* .
RUN --mount=type=cache,target=/go/pkg/mod go mod download

FROM scratch AS base-copy
ARG TARGETOS
ARG TARGETARCH
ARG VERSION=latest

# == bin ==

FROM base AS build
ENV GOOS=${TARGETOS} GOARCH=${TARGETARCH}
RUN --mount=target=. \
    --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    go build -o /dist/goerrbit-slim . && \
    go build -tags frontend -o /dist/goerrbit . && \
    (cd app/cli/goerrbit && go build -tags frontend -o /dist/goerrbit-full .)

FROM base-copy AS dist-base-windows
ENV SUFFIX=.exe

FROM base-copy AS dist-base-linux

FROM dist-base-${TARGETOS} as dist
COPY --from=build /dist/goerrbit-slim /${VERSION}/goerrbit-slim-${VERSION}-${TARGETOS}-${TARGETARCH}${SUFFIX}
COPY --from=build /dist/goerrbit      /${VERSION}/goerrbit-${VERSION}-${TARGETOS}-${TARGETARCH}${SUFFIX}
COPY --from=build /dist/goerrbit-full /${VERSION}/goerrbit-full-${VERSION}-${TARGETOS}-${TARGETARCH}${SUFFIX}

# == plugin ==

FROM base AS build-plugin
ENV GOOS=${TARGETOS} GOARCH=${TARGETARCH}
RUN --mount=target=. \
    --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    (cd plugins/command/main && go build -buildmode=plugin -o /dist/goerrbit-plugin-command.so .) && \
    (cd plugins/lark/main && go build -buildmode=plugin -o /dist/goerrbit-plugin-lark.so .)

FROM base-copy AS plugin
COPY --from=build-plugin /dist/goerrbit-plugin-command.so /plugins/goerrbit-plugin-command-${TARGETOS}-${TARGETARCH}.so
COPY --from=build-plugin /dist/goerrbit-plugin-lark.so /plugins/goerrbit-plugin-lark-${TARGETOS}-${TARGETARCH}.so

SHELL=/bin/bash

init:
	@yarn install && \
	yarn prepare

gen-api:
	@docker run -it --rm \
    -v "${PWD}:/local" openapitools/openapi-generator-cli generate \
		-g typescript-axios \
    -i /local/base-openapi/schema.yaml \
    -o /local/types/api \
		-p modelPropertyNaming=camelCase

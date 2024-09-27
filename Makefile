OUTPUT_DIR?=/usr/local/bin

steampipe:
	go build -buildvcs=false -o ${OUTPUT_DIR}/steampipe

dashboard_assets:
	$(MAKE) -C ui/dashboard

all:
	$(MAKE) -C pkg/pluginmanager_service
	$(MAKE) -C ui/dashboard
	go build -buildvcs=false -o ${OUTPUT_DIR}/steampipe

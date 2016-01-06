.DEFAULT_GOAL := help

# -- [ APPS ] ----------------------------------------------------------
bin := $(shell npm bin)
babel := $(bin)/babel
stylus := $(bin)/stylus


# -- [ CONFIGURATION ] -------------------------------------------------
STYLUS_PATHS = -I node_modules/nib/lib
STYLUS_DIR := stylus
STYLUS_BLD := css
STYLUS_SRC := $(shell find $(STYLUS_DIR)/ -name '*.styl')
STYLUS_TGT := ${STYLUS_SRC:$(STYLUS_DIR)/%.styl=$(STYLUS_BLD)/%.css}

SRC_DIR := src
TGT_DIR := lib
SRC := $(shell find $(SRC_DIR)/ -name '*.js')
TGT := ${SRC:$(SRC_DIR)/%.js=$(TGT_DIR)/%.js}


# -- [ COMPILATION ] ---------------------------------------------------
compile/stylus: $(STYLUS_SRC)
	mkdir -p $(STYLUS_BLD)
	$(stylus) $(STYLUS_PATHS) $$STYLUS_OPTIONS -o $(STYLUS_BLD) $(STYLUS_DIR)

$(TGT_DIR)/%.js: $(SRC_DIR)/%.js
	mkdir -p $(dir $@)
	$(babel) --source-maps inline --out-file $@ $<

node_modules: package.json
	npm install


# -- [ TASKS ] ---------------------------------------------------------
help:
	@echo ""
	@echo "Available tasks:"
	@echo ""
	@echo "  build-stylus .......... Compiles stylus files."
	@echo "  watch-stylus .......... Recompiles stylus automatically on every change."
	@echo "  build-js .............. Compiles JS files."
	@echo "  clean ................. Removes build artifacts from the working directory."
	@echo ""

foo:
	@echo "source:" $(SRC)
	@echo "target:" $(TGT)

build-stylus: node_modules compile/stylus
watch-stylus:
	STYLUS_OPTIONS="--watch" $(MAKE) build-stylus

build-js: node_modules $(TGT)

clean: $(STYLUS_TGT) $(TGT)
	rm -r $(STYLUS_TGT) $(TGT)


.PHONY: compile/stylus help build-stylus build-js watch-stylus clean

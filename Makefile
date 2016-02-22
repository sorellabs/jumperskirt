.DEFAULT_GOAL := help

# -- [ APPS ] ----------------------------------------------------------
bin := $(shell npm bin)
babel := $(bin)/babel
stylus := $(bin)/stylus
browserify := $(bin)/browserify


# -- [ CONFIGURATION ] -------------------------------------------------
STYLUS_PATHS = -I node_modules/nib/lib
STYLUS_DIR := stylus
STYLUS_BLD := css
STYLUS_SRC := $(shell find $(STYLUS_DIR)/ -name '*.styl')
STYLUS_TGT := ${STYLUS_SRC:$(STYLUS_DIR)/%.styl=$(STYLUS_BLD)/%.css}

SRC_DIR := src
SRC := $(shell find $(SRC_DIR)/ -name '*.js')
TGT := ${SRC:$(SRC_DIR)/%.js=%.js}

TEST_JS_SRC := $(shell find test/ -name '*.es6')
TEST_JS_TGT := ${TEST_JS_SRC:%.es6=%.js}

TEST_STYL_SRC := $(shell find test/ -name '*.styl')
TEST_STYL_TGT := ${TEST_STYL_SRC:%.styl=%.css}

BUNDLE_SRC := $(shell find test/ -name 'main.js')
BUNDLE_TGT := ${BUNDLE_SRC:%/main.js=%/main.bundle.js}


# -- [ COMPILATION ] ---------------------------------------------------
compile/stylus: $(STYLUS_SRC)
	mkdir -p $(STYLUS_BLD)
	$(stylus) $(STYLUS_PATHS) $$STYLUS_OPTIONS -o $(STYLUS_BLD) $(STYLUS_DIR)

%.css: %.styl
	$(stylus) $(STYLUS_PATHS) -I stylus -o $@ $<

compile/js: $(SRC)
	$(babel) src --source-map inline --out-dir .

%.js: %.es6
	$(babel) --source-map inline --out-file $@ $<

%/main.bundle.js: %/main.js $(TGT)
	$(browserify) --debug $< > $@



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
	@echo "  build-test ............ Builds test files."
	@echo "  clean ................. Removes build artifacts from the working directory."
	@echo ""


build-stylus: node_modules compile/stylus
watch-stylus:
	STYLUS_OPTIONS="--watch" $(MAKE) build-stylus

build-js: node_modules compile/js

build-test: $(TEST_JS_TGT) $(TEST_STYL_TGT) $(BUNDLE_TGT)

clean: $(STYLUS_TGT) $(TGT)
	rm -r $(STYLUS_TGT) $(TGT) core
	rm $(TEST_JS_TGT) $(TEST_STYL_TGT) $(BUNDLE_TGT)

test:
	exit 1

.PHONY: compile/stylus compile/js help build-stylus build-js watch-stylus clean

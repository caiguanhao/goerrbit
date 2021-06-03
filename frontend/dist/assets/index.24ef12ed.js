import { o as openBlock, c as createBlock, a as createVNode, w as withCtx, F as Fragment, r as resolveComponent, b as createTextVNode, d as axios, e as renderList, t as toDisplayString, p as pushScopeId, f as popScopeId, g as withModifiers, h as withDirectives, v as vModelText, i as createCommentVNode, j as withScopeId, k as format, l as renderSlot, m as vModelCheckbox, n as createStaticVNode, q as createRouter, s as createWebHistory, u as library, x as faThumbsUp, y as faCheckCircle, z as createApp, V as VueToastificationPlugin, A as useToast, B as FontAwesomeIcon } from "./vendor.d91c765b.js";
var bootstrap_min = "";
var index = "";
var App_vue_vue_type_style_index_0_lang = "";
const _sfc_main$b = {
  created() {
    document.addEventListener("click", (e) => {
      if (window.getSelection().toString().length)
        return;
      let el = e.target;
      while (el) {
        let node = el.nodeName;
        if (node === "A" || node === "BUTTON" || node === "INPUT")
          return;
        if (el.classList && el.classList.contains("clickable-row")) {
          let elem = el.querySelector("a.clickable-row-target") || el.querySelector("input[type=checkbox]") || el.querySelector("a");
          if (elem)
            elem.click();
          return;
        }
        el = el.parentNode;
      }
    });
  }
};
const _hoisted_1$b = { class: "navbar navbar-expand-md navbar-dark fixed-top bg-dark" };
const _hoisted_2$8 = { class: "container-fluid" };
const _hoisted_3$8 = /* @__PURE__ */ createTextVNode("Errbit");
const _hoisted_4$8 = /* @__PURE__ */ createVNode("button", {
  class: "navbar-toggler",
  type: "button",
  "data-bs-toggle": "collapse",
  "data-bs-target": "#navbarCollapse",
  "aria-controls": "navbarCollapse",
  "aria-expanded": "false",
  "aria-label": "Toggle navigation"
}, [
  /* @__PURE__ */ createVNode("span", { class: "navbar-toggler-icon" })
], -1);
const _hoisted_5$8 = {
  class: "collapse navbar-collapse",
  id: "navbarCollapse"
};
const _hoisted_6$7 = { class: "navbar-nav me-auto mb-2 mb-md-0" };
const _hoisted_7$7 = { class: "nav-item" };
const _hoisted_8$7 = /* @__PURE__ */ createTextVNode("Apps");
const _hoisted_9$7 = { class: "nav-item" };
const _hoisted_10$5 = /* @__PURE__ */ createTextVNode("Errors");
const _hoisted_11$4 = { class: "flex-shrink-0" };
const _hoisted_12$3 = { class: "container" };
const _hoisted_13$2 = /* @__PURE__ */ createVNode("footer", { class: "footer mt-auto py-3 bg-light" }, [
  /* @__PURE__ */ createVNode("div", { class: "container" }, [
    /* @__PURE__ */ createVNode("span", { class: "text-muted" }, [
      /* @__PURE__ */ createVNode("a", {
        href: "https://github.com/caiguanhao/goerrbit",
        target: "_blank"
      }, "goerrbit")
    ])
  ])
], -1);
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock(Fragment, null, [
    createVNode("header", null, [
      createVNode("nav", _hoisted_1$b, [
        createVNode("div", _hoisted_2$8, [
          createVNode(_component_router_link, {
            class: "navbar-brand",
            to: { name: "RouteHome" }
          }, {
            default: withCtx(() => [
              _hoisted_3$8
            ]),
            _: 1
          }),
          _hoisted_4$8,
          createVNode("div", _hoisted_5$8, [
            createVNode("ul", _hoisted_6$7, [
              createVNode("li", _hoisted_7$7, [
                createVNode(_component_router_link, {
                  class: "nav-link",
                  "active-class": "active",
                  to: { name: "RouteHome" }
                }, {
                  default: withCtx(() => [
                    _hoisted_8$7
                  ]),
                  _: 1
                })
              ]),
              createVNode("li", _hoisted_9$7, [
                createVNode(_component_router_link, {
                  class: "nav-link",
                  "active-class": "active",
                  to: { name: "RouteProblems" }
                }, {
                  default: withCtx(() => [
                    _hoisted_10$5
                  ]),
                  _: 1
                })
              ])
            ])
          ])
        ])
      ])
    ]),
    createVNode("main", _hoisted_11$4, [
      createVNode("div", _hoisted_12$3, [
        createVNode(_component_router_view)
      ])
    ]),
    _hoisted_13$2
  ], 64);
}
_sfc_main$b.render = _sfc_render$b;
const http = axios.create({
  baseURL: "/api/admin",
  withCredentials: true,
  timeout: 3e3
});
var pagination_vue_vue_type_style_index_0_lang = "";
const _sfc_main$a = {
  props: {
    pagination: Object
  },
  computed: {
    pages() {
      if (this.pagination.TotalPages < 6) {
        return this.pagination.TotalPages;
      }
      let pages = [1, 2, 3];
      let cp = this.pagination.CurrentPage;
      let tp = this.pagination.TotalPages;
      let hasCurrent = false;
      if (cp > 3 && cp <= tp - 3) {
        if (cp - pages[pages.length - 1] > 1)
          pages.push("\u2026");
        pages.push(cp);
        hasCurrent = true;
      }
      for (let i = 3; i > 0; i--) {
        let p = tp - (i - 1);
        if (i === 3) {
          if (!hasCurrent && p - pages[pages.length - 1] === 2) {
            pages.push(p - 1);
          } else if (p - pages[pages.length - 1] > 1) {
            pages.push("\u2026");
          }
        }
        pages.push(p);
      }
      return pages;
    }
  },
  methods: {
    queryForPage(page) {
      let q = Object.assign({}, this.$route.query, { page });
      if (page === 1)
        delete q.page;
      return q;
    }
  }
};
const _hoisted_1$a = { class: "pagination justify-content-center" };
const _hoisted_2$7 = /* @__PURE__ */ createTextVNode("Previous");
const _hoisted_3$7 = {
  key: 1,
  class: "page-link"
};
const _hoisted_4$7 = /* @__PURE__ */ createTextVNode("Next");
const _hoisted_5$7 = {
  key: 1,
  class: "page-link"
};
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createBlock("ul", _hoisted_1$a, [
    createVNode("li", {
      class: ["page-item", { disabled: !$props.pagination.PrevPage }]
    }, [
      $props.pagination.PrevPage ? (openBlock(), createBlock(_component_router_link, {
        key: 0,
        class: "page-link",
        to: { query: $options.queryForPage($props.pagination.PrevPage) }
      }, {
        default: withCtx(() => [
          _hoisted_2$7
        ]),
        _: 1
      }, 8, ["to"])) : (openBlock(), createBlock("span", _hoisted_3$7, "Previous"))
    ], 2),
    (openBlock(true), createBlock(Fragment, null, renderList($options.pages, (page) => {
      return openBlock(), createBlock("li", {
        class: ["page-item", {
          active: page === $props.pagination.CurrentPage,
          disabled: isNaN(page)
        }]
      }, [
        isNaN(page) ? (openBlock(), createBlock("span", {
          key: 0,
          class: "page-link",
          textContent: toDisplayString(page)
        }, null, 8, ["textContent"])) : (openBlock(), createBlock(_component_router_link, {
          key: 1,
          class: "page-link",
          to: { query: $options.queryForPage(page) },
          textContent: toDisplayString(page)
        }, null, 8, ["to", "textContent"]))
      ], 2);
    }), 256)),
    createVNode("li", {
      class: ["page-item", { disabled: !$props.pagination.NextPage }]
    }, [
      $props.pagination.NextPage ? (openBlock(), createBlock(_component_router_link, {
        key: 0,
        class: "page-link",
        to: { query: $options.queryForPage($props.pagination.NextPage) }
      }, {
        default: withCtx(() => [
          _hoisted_4$7
        ]),
        _: 1
      }, 8, ["to"])) : (openBlock(), createBlock("span", _hoisted_5$7, "Next"))
    ], 2)
  ]);
}
_sfc_main$a.render = _sfc_render$a;
var index_vue_vue_type_style_index_0_scoped_true_lang$2 = "";
const _sfc_main$9 = {
  data() {
    return {
      apps: [],
      pagination: {},
      lastAppId: null,
      query: null
    };
  },
  components: {
    Pagination: _sfc_main$a
  },
  computed: {
    isSearch() {
      return !!this.$route.query.query;
    }
  },
  methods: {
    load() {
      this.lastAppId = window.lastAppId;
      window.lastAppId = null;
      window.lastProblemId = null;
    },
    search() {
      this.$router.push({
        name: this.$route.name,
        query: {
          query: this.query || void 0
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    http.get("/apps", { params: to.query }).then((res) => {
      next((vm) => {
        vm.apps = res.data.Apps;
        vm.pagination = res.data.Pagination;
        vm.query = to.query.query;
        vm.load();
      });
    }, next);
  },
  beforeRouteUpdate(to, from, next) {
    http.get("/apps", { params: to.query }).then((res) => {
      this.apps = res.data.Apps;
      this.pagination = res.data.Pagination;
      this.query = to.query.query;
      this.load();
      next();
    }, next);
  }
};
const _withId$8 = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-32760654");
const _hoisted_1$9 = { class: "p-3 bg-light border rounded-3 mb-4 d-sm-flex align-items-center justify-content-between" };
const _hoisted_2$6 = /* @__PURE__ */ createVNode("div", { class: "mb-3 mb-sm-0" }, [
  /* @__PURE__ */ createVNode("h4", null, "Apps")
], -1);
const _hoisted_3$6 = /* @__PURE__ */ createTextVNode("Add a New App");
const _hoisted_4$6 = {
  key: 0,
  class: "mb-0"
};
const _hoisted_5$6 = { class: "d-sm-flex align-items-center justify-content-end" };
const _hoisted_6$6 = { class: "input-group" };
const _hoisted_7$6 = /* @__PURE__ */ createVNode("button", {
  class: "btn btn-outline-secondary",
  type: "submit"
}, "Search", -1);
const _hoisted_8$6 = { class: "table-responsive" };
const _hoisted_9$6 = { class: "table" };
const _hoisted_10$4 = /* @__PURE__ */ createVNode("thead", null, [
  /* @__PURE__ */ createVNode("tr", null, [
    /* @__PURE__ */ createVNode("th", { width: "100" }, "#"),
    /* @__PURE__ */ createVNode("th", null, "Name"),
    /* @__PURE__ */ createVNode("th", { width: "200" }, "Errors")
  ])
], -1);
popScopeId();
const _sfc_render$9 = /* @__PURE__ */ _withId$8((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_router_link = resolveComponent("router-link");
  const _component_Pagination = resolveComponent("Pagination");
  return openBlock(), createBlock(Fragment, null, [
    createVNode("div", _hoisted_1$9, [
      _hoisted_2$6,
      createVNode("div", null, [
        createVNode(_component_router_link, {
          to: { name: "RouteAppsNew" },
          class: "btn btn-primary"
        }, {
          default: _withId$8(() => [
            _hoisted_3$6
          ]),
          _: 1
        })
      ])
    ]),
    $data.pagination.TotalCount === 0 && !$options.isSearch ? (openBlock(), createBlock("h3", _hoisted_4$6, "No apps have been created yet")) : (openBlock(), createBlock(Fragment, { key: 1 }, [
      createVNode("div", _hoisted_5$6, [
        createVNode("form", {
          class: "mb-3",
          onSubmit: _cache[2] || (_cache[2] = withModifiers((...args) => $options.search && $options.search(...args), ["prevent"]))
        }, [
          createVNode("div", _hoisted_6$6, [
            withDirectives(createVNode("input", {
              type: "text",
              class: "form-control",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.query = $event)
            }, null, 512), [
              [vModelText, $data.query]
            ]),
            _hoisted_7$6
          ])
        ], 32)
      ]),
      createVNode("div", _hoisted_8$6, [
        createVNode("table", _hoisted_9$6, [
          _hoisted_10$4,
          createVNode("tbody", null, [
            (openBlock(true), createBlock(Fragment, null, renderList($data.apps, (app2) => {
              return openBlock(), createBlock("tr", {
                class: ["clickable-row", { highlighted: $data.lastAppId === app2.Id }]
              }, [
                createVNode("td", {
                  textContent: toDisplayString(app2.Id)
                }, null, 8, ["textContent"]),
                createVNode("td", null, [
                  createVNode(_component_router_link, {
                    to: { name: "RouteAppsShow", params: { id: app2.Id } },
                    textContent: toDisplayString(app2.Name)
                  }, null, 8, ["to", "textContent"])
                ]),
                createVNode("td", null, [
                  createVNode("span", {
                    class: ["badge rounded-pill", app2.ProblemsCount === 0 ? "bg-success" : "bg-danger"],
                    textContent: toDisplayString(app2.ProblemsCount)
                  }, null, 10, ["textContent"])
                ])
              ], 2);
            }), 256))
          ])
        ])
      ]),
      $data.pagination.TotalPages > 1 ? (openBlock(), createBlock(_component_Pagination, {
        key: 0,
        pagination: $data.pagination
      }, null, 8, ["pagination"])) : createCommentVNode("", true)
    ], 64))
  ], 64);
});
_sfc_main$9.render = _sfc_render$9;
_sfc_main$9.__scopeId = "data-v-32760654";
var problems_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$8 = {
  props: {
    apps: Array,
    problems: Array,
    pagination: Object
  },
  components: {
    Pagination: _sfc_main$a
  },
  data() {
    return {
      lastProblemId: null
    };
  },
  computed: {
    appNames() {
      if (!this.apps) {
        return null;
      }
      let map = {};
      for (let i = 0; i < this.apps.length; i++) {
        map[this.apps[i].Id] = this.apps[i].Name;
      }
      return map;
    },
    isSearch() {
      return !!this.$route.query.query;
    },
    hasNoProblems() {
      return this.pagination.TotalCount === 0;
    }
  },
  methods: {
    timeago(time) {
      return format(time);
    },
    resolve(problem) {
      if (!window.confirm("Resolve this issue? It can be unresolved later."))
        return;
      http.put(`/apps/${problem.AppId}/problems/${problem.Id}/resolve`).then((res) => {
        this.$toast().success("Successfully resovled issue");
        for (let key in res.data.Problem) {
          problem[key] = res.data.Problem[key];
        }
      }, () => {
        this.$toast().error("Error resolving issue");
      });
    }
  },
  created() {
    this.lastProblemId = window.lastProblemId;
    window.lastProblemId = null;
  }
};
const _withId$7 = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-0852d8da");
const _hoisted_1$8 = { key: 0 };
const _hoisted_2$5 = { class: "table-responsive" };
const _hoisted_3$5 = { class: "table" };
const _hoisted_4$5 = { width: "200" };
const _hoisted_5$5 = { key: 0 };
const _hoisted_6$5 = { key: 1 };
const _hoisted_7$5 = /* @__PURE__ */ createVNode("th", null, "WHAT / WHERE", -1);
const _hoisted_8$5 = /* @__PURE__ */ createVNode("th", { width: "200" }, "LATEST", -1);
const _hoisted_9$5 = /* @__PURE__ */ createVNode("th", { width: "100" }, "COUNT", -1);
const _hoisted_10$3 = /* @__PURE__ */ createVNode("th", { width: "100" }, "RESOLVE", -1);
const _hoisted_11$3 = { key: 0 };
const _hoisted_12$2 = { class: "ms-2" };
popScopeId();
const _sfc_render$8 = /* @__PURE__ */ _withId$7((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_router_link = resolveComponent("router-link");
  const _component_faicon = resolveComponent("faicon");
  const _component_Pagination = resolveComponent("Pagination");
  return $options.hasNoProblems ? (openBlock(), createBlock(Fragment, { key: 0 }, [
    $options.isSearch ? (openBlock(), createBlock("h3", _hoisted_1$8, "No errors matched your query")) : renderSlot(_ctx.$slots, "default", { key: 1 }, void 0, true)
  ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
    createVNode("div", _hoisted_2$5, [
      createVNode("table", _hoisted_3$5, [
        createVNode("thead", null, [
          createVNode("tr", null, [
            createVNode("th", _hoisted_4$5, [
              $props.apps ? (openBlock(), createBlock("div", _hoisted_5$5, "APP")) : (openBlock(), createBlock("div", _hoisted_6$5, "ENV"))
            ]),
            _hoisted_7$5,
            _hoisted_8$5,
            _hoisted_9$5,
            _hoisted_10$3
          ])
        ]),
        createVNode("tbody", null, [
          (openBlock(true), createBlock(Fragment, null, renderList($props.problems, (problem) => {
            return openBlock(), createBlock("tr", {
              class: ["clickable-row", {
                highlighted: $data.lastProblemId === problem.Id,
                resolved: !!problem.ResolvedAt
              }]
            }, [
              createVNode("td", null, [
                $props.apps ? (openBlock(), createBlock("div", _hoisted_11$3, [
                  createVNode(_component_router_link, {
                    to: { name: "RouteAppsShow", params: { id: problem.AppId } },
                    textContent: toDisplayString($options.appNames[problem.AppId])
                  }, null, 8, ["to", "textContent"]),
                  createVNode("small", _hoisted_12$2, [
                    createVNode("small", {
                      textContent: toDisplayString(problem.Environment)
                    }, null, 8, ["textContent"])
                  ])
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  textContent: toDisplayString(problem.Environment)
                }, null, 8, ["textContent"]))
              ]),
              createVNode("td", null, [
                createVNode(_component_router_link, {
                  to: { name: "RouteProblemsShow", params: { id: problem.AppId, pid: problem.Id } },
                  class: "clickable-row-target",
                  textContent: toDisplayString(problem.Message)
                }, null, 8, ["to", "textContent"]),
                createVNode("div", {
                  class: "small fst-italic text-muted",
                  textContent: toDisplayString(problem.Location)
                }, null, 8, ["textContent"])
              ]),
              createVNode("td", null, [
                createVNode("div", {
                  class: "text-nowrap",
                  textContent: toDisplayString($options.timeago(problem.LastNoticeAt))
                }, null, 8, ["textContent"])
              ]),
              createVNode("td", null, [
                createVNode("span", {
                  class: ["badge rounded-pill", problem.NoticesCount === 0 ? "bg-success" : "bg-danger"],
                  textContent: toDisplayString(problem.NoticesCount)
                }, null, 10, ["textContent"])
              ]),
              createVNode("td", null, [
                !problem.ResolvedAt ? (openBlock(), createBlock("a", {
                  key: 0,
                  href: "",
                  class: "text-primary",
                  onClick: withModifiers(($event) => $options.resolve(problem), ["prevent"])
                }, [
                  createVNode(_component_faicon, { icon: "thumbs-up" })
                ], 8, ["onClick"])) : createCommentVNode("", true)
              ])
            ], 2);
          }), 256))
        ])
      ])
    ]),
    $props.pagination.TotalPages > 1 ? (openBlock(), createBlock(_component_Pagination, {
      key: 0,
      pagination: $props.pagination
    }, null, 8, ["pagination"])) : createCommentVNode("", true)
  ], 64));
});
_sfc_main$8.render = _sfc_render$8;
_sfc_main$8.__scopeId = "data-v-0852d8da";
const _sfc_main$7 = {
  data() {
    return {
      query: null
    };
  },
  created() {
    this.query = this.$route.query.query;
  },
  methods: {
    search() {
      this.$router.push({
        name: this.$route.name,
        query: {
          status: this.$route.query.status,
          query: this.query || void 0
        }
      });
    }
  }
};
const _hoisted_1$7 = { class: "d-sm-flex align-items-center justify-content-between" };
const _hoisted_2$4 = { class: "btn-group mb-3" };
const _hoisted_3$4 = { class: "dropdown-menu" };
const _hoisted_4$4 = { key: 0 };
const _hoisted_5$4 = /* @__PURE__ */ createTextVNode("Unresolved Errors");
const _hoisted_6$4 = { key: 1 };
const _hoisted_7$4 = /* @__PURE__ */ createTextVNode("Resolved Errors");
const _hoisted_8$4 = { class: "input-group" };
const _hoisted_9$4 = /* @__PURE__ */ createVNode("button", {
  class: "btn btn-outline-secondary",
  type: "submit"
}, "Search", -1);
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createBlock("div", _hoisted_1$7, [
    createVNode("div", _hoisted_2$4, [
      createVNode("button", {
        class: "btn btn-outline-secondary dropdown-toggle",
        type: "button",
        "data-bs-toggle": "dropdown",
        "aria-expanded": "false",
        textContent: toDisplayString(_ctx.$route.query.status === "resolved" ? "Resolved Errors" : "Unresolved Errors")
      }, null, 8, ["textContent"]),
      createVNode("ul", _hoisted_3$4, [
        _ctx.$route.query.status === "resolved" ? (openBlock(), createBlock("li", _hoisted_4$4, [
          createVNode(_component_router_link, {
            class: "dropdown-item",
            to: { query: { query: _ctx.$route.query.query } }
          }, {
            default: withCtx(() => [
              _hoisted_5$4
            ]),
            _: 1
          }, 8, ["to"])
        ])) : (openBlock(), createBlock("li", _hoisted_6$4, [
          createVNode(_component_router_link, {
            class: "dropdown-item",
            to: { query: { query: _ctx.$route.query.query, status: "resolved" } }
          }, {
            default: withCtx(() => [
              _hoisted_7$4
            ]),
            _: 1
          }, 8, ["to"])
        ]))
      ])
    ]),
    createVNode("form", {
      class: "mb-3",
      onSubmit: _cache[2] || (_cache[2] = withModifiers((...args) => $options.search && $options.search(...args), ["prevent"]))
    }, [
      createVNode("div", _hoisted_8$4, [
        withDirectives(createVNode("input", {
          type: "text",
          class: "form-control",
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.query = $event)
        }, null, 512), [
          [vModelText, $data.query]
        ]),
        _hoisted_9$4
      ])
    ], 32)
  ]);
}
_sfc_main$7.render = _sfc_render$7;
var show_vue_vue_type_style_index_0_scoped_true_lang$1 = "";
const _sfc_main$6 = {
  components: {
    Problems: _sfc_main$8,
    ProblemsHeader: _sfc_main$7
  },
  data() {
    return {
      app: {},
      problems: [],
      pagination: {}
    };
  },
  computed: {
    rubyCode() {
      let host = `${window.location.protocol}//${window.location.host}`;
      return `# Require the airbrake gem in your App.
# ---------------------------------------------
#
# Ruby - In your Gemfile
# gem 'airbrake', '~> 5.0'
#
# Then add the following to config/initializers/errbit.rb
# -------------------------------------------------------

Airbrake.configure do |config|
  config.host = '${host}'
  config.project_id = 1 # required, but any positive integer works
  config.project_key = '${this.app.ApiKey}'

  # Uncomment for Rails apps
  # config.environment = Rails.env
  # config.ignore_environments = %w(development test)
end`;
    }
  },
  methods: {
    load() {
      window.lastAppId = this.app.Id;
    }
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      http.get(`/apps/${to.params.id}`),
      http.get(`/apps/${to.params.id}/problems`, { params: to.query })
    ]).then((res) => {
      next((vm) => {
        vm.app = res[0].data.App;
        vm.problems = res[1].data.Problems;
        vm.pagination = res[1].data.Pagination;
        vm.load();
      });
    }, next);
  },
  beforeRouteUpdate(to, from, next) {
    Promise.all([
      http.get(`/apps/${to.params.id}`),
      http.get(`/apps/${to.params.id}/problems`, { params: to.query })
    ]).then((res) => {
      this.app = res[0].data.App;
      this.problems = res[1].data.Problems;
      this.pagination = res[1].data.Pagination;
      this.load();
      next();
    }, next);
  }
};
const _withId$6 = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-3e1315c9");
const _hoisted_1$6 = { class: "p-3 bg-light border rounded-3 mb-4 d-sm-flex align-items-center justify-content-between" };
const _hoisted_2$3 = { class: "mb-3 mb-sm-0" };
const _hoisted_3$3 = { class: "small" };
const _hoisted_4$3 = /* @__PURE__ */ createVNode("strong", null, "Errors Caught:", -1);
const _hoisted_5$3 = /* @__PURE__ */ createTextVNode();
const _hoisted_6$3 = /* @__PURE__ */ createVNode("strong", { class: "ms-3" }, "API Key:", -1);
const _hoisted_7$3 = /* @__PURE__ */ createTextVNode();
const _hoisted_8$3 = /* @__PURE__ */ createTextVNode("Edit");
const _hoisted_9$3 = /* @__PURE__ */ createVNode("h3", { class: "mb-3" }, "No errors have been caught yet, make sure you set up your app", -1);
popScopeId();
const _sfc_render$6 = /* @__PURE__ */ _withId$6((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_router_link = resolveComponent("router-link");
  const _component_ProblemsHeader = resolveComponent("ProblemsHeader");
  const _component_Problems = resolveComponent("Problems");
  return openBlock(), createBlock(Fragment, null, [
    createVNode("div", _hoisted_1$6, [
      createVNode("div", _hoisted_2$3, [
        createVNode("h4", {
          textContent: toDisplayString($data.app.Name)
        }, null, 8, ["textContent"]),
        createVNode("div", _hoisted_3$3, [
          _hoisted_4$3,
          _hoisted_5$3,
          createVNode("span", {
            textContent: toDisplayString($data.app.ProblemsCount)
          }, null, 8, ["textContent"]),
          _hoisted_6$3,
          _hoisted_7$3,
          createVNode("span", {
            textContent: toDisplayString($data.app.ApiKey)
          }, null, 8, ["textContent"])
        ])
      ]),
      createVNode("div", null, [
        createVNode(_component_router_link, {
          to: { name: "RouteAppsEdit", params: { id: $data.app.Id } },
          class: "btn btn-primary"
        }, {
          default: _withId$6(() => [
            _hoisted_8$3
          ]),
          _: 1
        }, 8, ["to"])
      ])
    ]),
    createVNode(_component_ProblemsHeader),
    createVNode(_component_Problems, {
      problems: $data.problems,
      pagination: $data.pagination
    }, {
      default: _withId$6(() => [
        _hoisted_9$3,
        createVNode("pre", {
          class: "p-3 bg-light border rounded-3 mb-4",
          textContent: toDisplayString($options.rubyCode)
        }, null, 8, ["textContent"])
      ]),
      _: 1
    }, 8, ["problems", "pagination"])
  ], 64);
});
_sfc_main$6.render = _sfc_render$6;
_sfc_main$6.__scopeId = "data-v-3e1315c9";
var form_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$5 = {
  props: {
    obj: Object
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    currentFingerprinter() {
      if (this.obj.Fingerprinter) {
        return this.obj.Fingerprinter;
      }
      return this.obj.ActualFingerprinter;
    },
    customFingerprinter: {
      get() {
        return !!this.obj.Fingerprinter;
      },
      set(val) {
        if (val) {
          this.obj.Fingerprinter = JSON.parse(JSON.stringify(this.obj.ActualFingerprinter));
        } else {
          this.obj.Fingerprinter = null;
        }
      }
    }
  },
  methods: {
    generateApiKey() {
      let key = [];
      let chars = "abcdef0123456789";
      for (let i = 0; i < 32; i++) {
        key.push(chars.charAt(Math.floor(Math.random() * 16)));
      }
      this.obj.ApiKey = key.join("");
    },
    submit() {
      this.loading = true;
      this.processErrors();
      if (this.obj.Id) {
        http.put(`/apps/${this.obj.Id}`, this.obj).then((res) => {
          this.loading = false;
          for (let key in res.data.App) {
            this.obj[key] = res.data.App[key];
          }
          this.$router.push({
            name: "RouteAppsShow",
            params: {
              id: res.data.App.Id
            }
          });
          this.$toast().success("Successfully updated app");
        }, (e) => {
          this.loading = false;
          if (!this.processErrors(e)) {
            this.$toast().error("Error updating app");
          }
        });
        return;
      }
      http.post(`/apps`, this.obj).then((res) => {
        this.loading = false;
        this.$router.push({
          name: "RouteAppsShow",
          params: {
            id: res.data.App.Id
          }
        });
        this.$toast().success("Successfully creating app");
      }, (e) => {
        this.loading = false;
        if (!this.processErrors(e)) {
          this.$toast().error("Error creating app");
        }
      });
    }
  }
};
const _withId$5 = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-3037d841");
const _hoisted_1$5 = { class: "mb-3 row" };
const _hoisted_2$2 = /* @__PURE__ */ createVNode("label", { class: "col-sm-2 col-form-label" }, "Name", -1);
const _hoisted_3$2 = { class: "col-sm-8" };
const _hoisted_4$2 = { class: "mb-3 row" };
const _hoisted_5$2 = /* @__PURE__ */ createVNode("label", { class: "col-sm-2 col-form-label" }, "API Key", -1);
const _hoisted_6$2 = { class: "col-sm-8" };
const _hoisted_7$2 = { class: "col-sm-2" };
const _hoisted_8$2 = { class: "form-control-plaintext" };
const _hoisted_9$2 = { class: "mb-3 row" };
const _hoisted_10$2 = /* @__PURE__ */ createVNode("label", { class: "col-sm-2 col-form-label" }, "Fingerprinter", -1);
const _hoisted_11$2 = {
  key: 0,
  class: "col-sm-8"
};
const _hoisted_12$1 = { class: "form-control-plaintext" };
const _hoisted_13$1 = { class: "form-check" };
const _hoisted_14$1 = { class: "form-check-label" };
const _hoisted_15$1 = /* @__PURE__ */ createVNode("span", null, "Custom Fingerprinter", -1);
const _hoisted_16$1 = { class: "form-check" };
const _hoisted_17$1 = { class: "form-check-label" };
const _hoisted_18$1 = /* @__PURE__ */ createVNode("span", null, "Error Class", -1);
const _hoisted_19$1 = { class: "form-check" };
const _hoisted_20$1 = { class: "form-check-label" };
const _hoisted_21$1 = /* @__PURE__ */ createVNode("span", null, "Message", -1);
const _hoisted_22$1 = { class: "form-check" };
const _hoisted_23$1 = { class: "form-check-label" };
const _hoisted_24$1 = /* @__PURE__ */ createVNode("span", null, "Component", -1);
const _hoisted_25$1 = { class: "form-check" };
const _hoisted_26$1 = { class: "form-check-label" };
const _hoisted_27$1 = /* @__PURE__ */ createVNode("span", null, "Action", -1);
const _hoisted_28$1 = { class: "form-check" };
const _hoisted_29 = { class: "form-check-label" };
const _hoisted_30 = /* @__PURE__ */ createVNode("span", null, "Environment Name", -1);
const _hoisted_31$1 = { class: "form-check" };
const _hoisted_32$1 = { class: "input-group input-group-sm backtrace" };
const _hoisted_33$1 = /* @__PURE__ */ createVNode("span", { class: "input-group-text" }, "Backtrace Lines", -1);
const _hoisted_34$1 = { class: "mb-3 row" };
const _hoisted_35$1 = { class: "col-sm-10 offset-sm-2" };
popScopeId();
const _sfc_render$5 = /* @__PURE__ */ _withId$5((_ctx, _cache, $props, $setup, $data, $options) => {
  return openBlock(), createBlock("form", {
    onSubmit: _cache[11] || (_cache[11] = withModifiers((...args) => $options.submit && $options.submit(...args), ["prevent"]))
  }, [
    createVNode("div", _hoisted_1$5, [
      _hoisted_2$2,
      createVNode("div", _hoisted_3$2, [
        withDirectives(createVNode("input", {
          type: "text",
          class: "form-control",
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $props.obj.Name = $event),
          ref: "Name"
        }, null, 512), [
          [vModelText, $props.obj.Name]
        ])
      ])
    ]),
    createVNode("div", _hoisted_4$2, [
      _hoisted_5$2,
      createVNode("div", _hoisted_6$2, [
        withDirectives(createVNode("input", {
          type: "text",
          class: "form-control",
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $props.obj.ApiKey = $event),
          ref: "ApiKey"
        }, null, 512), [
          [vModelText, $props.obj.ApiKey]
        ])
      ]),
      createVNode("div", _hoisted_7$2, [
        createVNode("div", _hoisted_8$2, [
          createVNode("a", {
            href: "",
            onClick: _cache[3] || (_cache[3] = withModifiers((...args) => $options.generateApiKey && $options.generateApiKey(...args), ["prevent"]))
          }, "Regenerate")
        ])
      ])
    ]),
    createVNode("div", _hoisted_9$2, [
      _hoisted_10$2,
      $props.obj.ActualFingerprinter ? (openBlock(), createBlock("div", _hoisted_11$2, [
        createVNode("div", _hoisted_12$1, [
          createVNode("div", _hoisted_13$1, [
            createVNode("label", _hoisted_14$1, [
              withDirectives(createVNode("input", {
                class: "form-check-input",
                type: "checkbox",
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $options.customFingerprinter = $event)
              }, null, 512), [
                [vModelCheckbox, $options.customFingerprinter]
              ]),
              _hoisted_15$1
            ])
          ]),
          createVNode("div", _hoisted_16$1, [
            createVNode("label", _hoisted_17$1, [
              withDirectives(createVNode("input", {
                class: "form-check-input",
                type: "checkbox",
                disabled: !$options.customFingerprinter,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $options.currentFingerprinter.ErrorClass = $event)
              }, null, 8, ["disabled"]), [
                [vModelCheckbox, $options.currentFingerprinter.ErrorClass]
              ]),
              _hoisted_18$1
            ])
          ]),
          createVNode("div", _hoisted_19$1, [
            createVNode("label", _hoisted_20$1, [
              withDirectives(createVNode("input", {
                class: "form-check-input",
                type: "checkbox",
                disabled: !$options.customFingerprinter,
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $options.currentFingerprinter.Message = $event)
              }, null, 8, ["disabled"]), [
                [vModelCheckbox, $options.currentFingerprinter.Message]
              ]),
              _hoisted_21$1
            ])
          ]),
          createVNode("div", _hoisted_22$1, [
            createVNode("label", _hoisted_23$1, [
              withDirectives(createVNode("input", {
                class: "form-check-input",
                type: "checkbox",
                disabled: !$options.customFingerprinter,
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $options.currentFingerprinter.Component = $event)
              }, null, 8, ["disabled"]), [
                [vModelCheckbox, $options.currentFingerprinter.Component]
              ]),
              _hoisted_24$1
            ])
          ]),
          createVNode("div", _hoisted_25$1, [
            createVNode("label", _hoisted_26$1, [
              withDirectives(createVNode("input", {
                class: "form-check-input",
                type: "checkbox",
                disabled: !$options.customFingerprinter,
                "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $options.currentFingerprinter.Action = $event)
              }, null, 8, ["disabled"]), [
                [vModelCheckbox, $options.currentFingerprinter.Action]
              ]),
              _hoisted_27$1
            ])
          ]),
          createVNode("div", _hoisted_28$1, [
            createVNode("label", _hoisted_29, [
              withDirectives(createVNode("input", {
                class: "form-check-input",
                type: "checkbox",
                disabled: !$options.customFingerprinter,
                "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $options.currentFingerprinter.EnvironmentName = $event)
              }, null, 8, ["disabled"]), [
                [vModelCheckbox, $options.currentFingerprinter.EnvironmentName]
              ]),
              _hoisted_30
            ])
          ]),
          createVNode("div", _hoisted_31$1, [
            createVNode("div", _hoisted_32$1, [
              _hoisted_33$1,
              withDirectives(createVNode("input", {
                class: "form-control",
                type: "number",
                min: "-1",
                step: "1",
                disabled: !$options.customFingerprinter,
                "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $options.currentFingerprinter.BacktraceLines = $event)
              }, null, 8, ["disabled"]), [
                [
                  vModelText,
                  $options.currentFingerprinter.BacktraceLines,
                  void 0,
                  { number: true }
                ]
              ])
            ])
          ])
        ])
      ])) : createCommentVNode("", true)
    ]),
    createVNode("div", _hoisted_34$1, [
      createVNode("div", _hoisted_35$1, [
        createVNode("button", {
          type: "submit",
          class: "btn btn-primary",
          disabled: $data.loading
        }, "Submit", 8, ["disabled"])
      ])
    ])
  ], 32);
});
_sfc_main$5.render = _sfc_render$5;
_sfc_main$5.__scopeId = "data-v-3037d841";
var new_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$4 = {
  components: {
    Form: _sfc_main$5
  },
  data() {
    return {
      app: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    http.post(`/apps`).then((res) => {
      next((vm) => {
        vm.app = res.data.App;
        setTimeout(() => {
          vm.$refs.form.generateApiKey();
        });
      });
    }, next);
  },
  beforeRouteUpdate(to, from, next) {
    http.post(`/apps`).then((res) => {
      this.app = res.data.App;
      setTimeout(() => {
        this.$refs.form.generateApiKey();
      });
      next();
    }, next);
  }
};
const _withId$4 = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-3fbf1a4a");
const _hoisted_1$4 = /* @__PURE__ */ createVNode("div", { class: "mb-3 border-bottom" }, [
  /* @__PURE__ */ createVNode("h1", { class: "h3" }, "Add App")
], -1);
popScopeId();
const _sfc_render$4 = /* @__PURE__ */ _withId$4((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_Form = resolveComponent("Form");
  return openBlock(), createBlock(Fragment, null, [
    _hoisted_1$4,
    createVNode(_component_Form, {
      class: "col-sm-8",
      obj: $data.app,
      ref: "form"
    }, null, 8, ["obj"])
  ], 64);
});
_sfc_main$4.render = _sfc_render$4;
_sfc_main$4.__scopeId = "data-v-3fbf1a4a";
var edit_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$3 = {
  components: {
    Form: _sfc_main$5
  },
  data() {
    return {
      app: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    http.get(`/apps/${to.params.id}`).then((res) => {
      next((vm) => {
        vm.app = res.data.App;
      });
    }, next);
  },
  beforeRouteUpdate(to, from, next) {
    http.get(`/apps/${to.params.id}`).then((res) => {
      this.app = res.data.App;
      next();
    }, next);
  }
};
const _withId$3 = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-a44e4ce4");
const _hoisted_1$3 = /* @__PURE__ */ createVNode("div", { class: "mb-3 border-bottom" }, [
  /* @__PURE__ */ createVNode("h1", { class: "h3" }, "Edit App")
], -1);
popScopeId();
const _sfc_render$3 = /* @__PURE__ */ _withId$3((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_Form = resolveComponent("Form");
  return openBlock(), createBlock(Fragment, null, [
    _hoisted_1$3,
    createVNode(_component_Form, {
      class: "col-sm-8",
      obj: $data.app
    }, null, 8, ["obj"])
  ], 64);
});
_sfc_main$3.render = _sfc_render$3;
_sfc_main$3.__scopeId = "data-v-a44e4ce4";
var index_vue_vue_type_style_index_0_scoped_true_lang$1 = "";
const _sfc_main$2 = {
  components: {
    Problems: _sfc_main$8,
    ProblemsHeader: _sfc_main$7
  },
  data() {
    return {
      problems: [],
      pagination: {},
      apps: []
    };
  },
  methods: {
    load() {
      window.lastAppId = null;
    }
  },
  beforeRouteEnter(to, from, next) {
    http.get("/problems", { params: to.query }).then((res) => {
      next((vm) => {
        vm.problems = res.data.Problems;
        vm.pagination = res.data.Pagination;
        vm.apps = res.data.Apps;
        vm.query = to.query.query;
        vm.load();
      });
    }, next);
  },
  beforeRouteUpdate(to, from, next) {
    http.get("/problems", { params: to.query }).then((res) => {
      this.problems = res.data.Problems;
      this.pagination = res.data.Pagination;
      this.apps = res.data.Apps;
      this.query = to.query.query;
      this.load();
      next();
    }, next);
  }
};
const _withId$2 = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-42459cb4");
const _hoisted_1$2 = /* @__PURE__ */ createVNode("h3", { class: "mb-0" }, "No errors have been caught yet", -1);
popScopeId();
const _sfc_render$2 = /* @__PURE__ */ _withId$2((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_ProblemsHeader = resolveComponent("ProblemsHeader");
  const _component_Problems = resolveComponent("Problems");
  return openBlock(), createBlock(Fragment, null, [
    createVNode(_component_ProblemsHeader),
    createVNode(_component_Problems, {
      problems: $data.problems,
      apps: $data.apps,
      pagination: $data.pagination
    }, {
      default: _withId$2(() => [
        _hoisted_1$2
      ]),
      _: 1
    }, 8, ["problems", "apps", "pagination"])
  ], 64);
});
_sfc_main$2.render = _sfc_render$2;
_sfc_main$2.__scopeId = "data-v-42459cb4";
var show_vue_vue_type_style_index_0_scoped_true_lang = "";
function makeRequests(params) {
  return Promise.all([
    http.get(`/apps/${params.id}`),
    http.get(`/apps/${params.id}/problems/${params.pid}`),
    params.nid ? http.get(`/apps/${params.id}/problems/${params.pid}/notices/${params.nid}`) : Promise.resolve()
  ]);
}
const _sfc_main$1 = {
  data() {
    return {
      app: {},
      problem: {},
      notice: {},
      nav: null
    };
  },
  computed: {
    hasUserAttributes() {
      for (let key in this.notice.UserAttributes) {
        return true;
      }
      return false;
    }
  },
  methods: {
    load() {
      this.getNav();
      window.lastProblemId = this.problem.Id;
      window.lastAppId = this.app.Id;
    },
    getNav() {
      http.get(`/apps/${this.app.Id}/problems/${this.problem.Id}/notices/${this.notice.Id}/nav`).then((res) => {
        this.nav = res.data.Nav;
      });
    },
    resolve() {
      if (!window.confirm("Resolve this issue? It can be unresolved later."))
        return;
      http.put(`/apps/${this.problem.AppId}/problems/${this.problem.Id}/resolve`).then((res) => {
        this.$toast().success("Successfully resovled issue");
        for (let key in res.data.Problem) {
          this.problem[key] = res.data.Problem[key];
        }
      }, () => {
        this.$toast().error("Error resolving issue");
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    makeRequests(to.params).then((res) => {
      const app2 = res[0].data.App;
      const problem = res[1].data.Problem;
      if (res[2]) {
        next((vm) => {
          vm.app = app2;
          vm.problem = problem;
          vm.notice = res[2].data.Notice;
          vm.load();
        });
        return;
      }
      return http.get(`/apps/${to.params.id}/problems/${to.params.pid}/notices/${problem.LastNoticeId}`).then((res2) => {
        next((vm) => {
          vm.app = app2;
          vm.problem = problem;
          vm.notice = res2.data.Notice;
          vm.load();
        });
      });
    }, next);
  },
  beforeRouteUpdate(to, from, next) {
    makeRequests(to.params).then((res) => {
      const app2 = res[0].data.App;
      const problem = res[1].data.Problem;
      if (res[2]) {
        this.app = app2;
        this.problem = problem;
        this.notice = res[2].data.Notice;
        this.load();
        next();
        return;
      }
      return http.get(`/apps/${to.params.id}/problems/${to.params.pid}/notices/${problem.LastNoticeId}`).then((res2) => {
        this.app = app2;
        this.problem = problem;
        this.notice = res2.data.Notice;
        this.load();
        next();
      });
    }, next);
  }
};
const _withId$1 = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-318dacca");
const _hoisted_1$1 = { class: "p-3 bg-light border rounded-3 mb-4" };
const _hoisted_2$1 = { class: "d-sm-flex align-items-center justify-content-between" };
const _hoisted_3$1 = {
  key: 0,
  class: "mb-2 ms-3 text-success"
};
const _hoisted_4$1 = /* @__PURE__ */ createTextVNode(" Resolved");
const _hoisted_5$1 = /* @__PURE__ */ createTextVNode(" Resolve ");
const _hoisted_6$1 = { class: "small" };
const _hoisted_7$1 = /* @__PURE__ */ createVNode("strong", null, "App: ", -1);
const _hoisted_8$1 = /* @__PURE__ */ createVNode("strong", { class: "ms-2" }, "Where: ", -1);
const _hoisted_9$1 = { class: "small" };
const _hoisted_10$1 = /* @__PURE__ */ createVNode("strong", null, "Environment: ", -1);
const _hoisted_11$1 = /* @__PURE__ */ createVNode("strong", { class: "ms-2" }, "First Notice: ", -1);
const _hoisted_12 = /* @__PURE__ */ createVNode("strong", { class: "ms-2" }, "Last Notice: ", -1);
const _hoisted_13 = /* @__PURE__ */ createVNode("strong", { class: "ms-2" }, "Resolved At: ", -1);
const _hoisted_14 = { class: "d-flex mb-4" };
const _hoisted_15 = { class: "me-3" };
const _hoisted_16 = { key: 0 };
const _hoisted_17 = /* @__PURE__ */ createTextVNode("\u2190 Older");
const _hoisted_18 = { class: "me-3" };
const _hoisted_19 = { key: 0 };
const _hoisted_20 = /* @__PURE__ */ createTextVNode("Newer \u2192");
const _hoisted_21 = /* @__PURE__ */ createTextVNode(" viewing occurrence ");
const _hoisted_22 = /* @__PURE__ */ createTextVNode(" of ");
const _hoisted_23 = { class: "nav nav-pills mb-3" };
const _hoisted_24 = /* @__PURE__ */ createVNode("li", { class: "nav-item" }, [
  /* @__PURE__ */ createVNode("button", {
    class: "nav-link active",
    type: "button",
    "data-bs-toggle": "pill",
    "data-bs-target": "#page-summary"
  }, "Summary")
], -1);
const _hoisted_25 = /* @__PURE__ */ createVNode("li", { class: "nav-item" }, [
  /* @__PURE__ */ createVNode("button", {
    class: "nav-link",
    type: "button",
    "data-bs-toggle": "pill",
    "data-bs-target": "#page-backtrace"
  }, "Backtrace")
], -1);
const _hoisted_26 = {
  key: 0,
  class: "nav-item"
};
const _hoisted_27 = /* @__PURE__ */ createVNode("button", {
  class: "nav-link",
  type: "button",
  "data-bs-toggle": "pill",
  "data-bs-target": "#page-user"
}, "User", -1);
const _hoisted_28 = /* @__PURE__ */ createStaticVNode('<li class="nav-item" data-v-318dacca><button class="nav-link" type="button" data-bs-toggle="pill" data-bs-target="#page-environment" data-v-318dacca>Environment</button></li><li class="nav-item" data-v-318dacca><button class="nav-link" type="button" data-bs-toggle="pill" data-bs-target="#page-parameters" data-v-318dacca>Parameters</button></li><li class="nav-item" data-v-318dacca><button class="nav-link" type="button" data-bs-toggle="pill" data-bs-target="#page-session" data-v-318dacca>Session</button></li>', 3);
const _hoisted_31 = { class: "tab-content" };
const _hoisted_32 = {
  class: "tab-pane show active",
  id: "page-summary"
};
const _hoisted_33 = { class: "table-responsive" };
const _hoisted_34 = { class: "table table-bordered" };
const _hoisted_35 = /* @__PURE__ */ createVNode("td", {
  class: "fw-bold",
  width: "200"
}, "MESSAGE", -1);
const _hoisted_36 = { class: "small" };
const _hoisted_37 = /* @__PURE__ */ createVNode("td", { class: "fw-bold" }, "ERROR CLASS", -1);
const _hoisted_38 = /* @__PURE__ */ createVNode("td", { class: "fw-bold" }, "URL", -1);
const _hoisted_39 = /* @__PURE__ */ createVNode("td", { class: "fw-bold" }, "WHERE", -1);
const _hoisted_40 = /* @__PURE__ */ createVNode("td", { class: "fw-bold" }, "OCCURRED", -1);
const _hoisted_41 = /* @__PURE__ */ createVNode("td", { class: "fw-bold" }, "SIMILAR", -1);
const _hoisted_42 = /* @__PURE__ */ createVNode("td", { class: "fw-bold" }, "BROWSER", -1);
const _hoisted_43 = { class: "small" };
const _hoisted_44 = /* @__PURE__ */ createVNode("td", { class: "fw-bold" }, "ORIGIN", -1);
const _hoisted_45 = { class: "small" };
const _hoisted_46 = /* @__PURE__ */ createVNode("td", { class: "fw-bold" }, "APP SERVER", -1);
const _hoisted_47 = { key: 0 };
const _hoisted_48 = /* @__PURE__ */ createVNode("td", { class: "fw-bold" }, "APP VERSION", -1);
const _hoisted_49 = { key: 1 };
const _hoisted_50 = /* @__PURE__ */ createVNode("td", { class: "fw-bold" }, "FRAMEWORK", -1);
const _hoisted_51 = /* @__PURE__ */ createVNode("td", { class: "fw-bold" }, "REL. DIRECTORY", -1);
const _hoisted_52 = {
  class: "tab-pane",
  id: "page-backtrace"
};
const _hoisted_53 = { class: "p-3 bg-light border rounded-3 mb-4 small" };
const _hoisted_54 = { class: "text-nowrap" };
const _hoisted_55 = /* @__PURE__ */ createTextVNode(" \u2192 ");
const _hoisted_56 = {
  key: 0,
  class: "tab-pane",
  id: "page-user"
};
const _hoisted_57 = { class: "table-responsive" };
const _hoisted_58 = { class: "table table-bordered" };
const _hoisted_59 = {
  class: "tab-pane",
  id: "page-environment"
};
const _hoisted_60 = { class: "table-responsive" };
const _hoisted_61 = { class: "table table-bordered" };
const _hoisted_62 = {
  class: "tab-pane",
  id: "page-parameters"
};
const _hoisted_63 = {
  class: "tab-pane",
  id: "page-session"
};
popScopeId();
const _sfc_render$1 = /* @__PURE__ */ _withId$1((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_faicon = resolveComponent("faicon");
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createBlock(Fragment, null, [
    createVNode("div", _hoisted_1$1, [
      createVNode("div", _hoisted_2$1, [
        createVNode("h4", {
          class: "mb-2",
          textContent: toDisplayString($data.problem.ErrorClass)
        }, null, 8, ["textContent"]),
        $data.problem.ResolvedAt ? (openBlock(), createBlock("div", _hoisted_3$1, [
          createVNode(_component_faicon, { icon: "check-circle" }),
          _hoisted_4$1
        ])) : (openBlock(), createBlock("button", {
          key: 1,
          class: "btn btn-sm btn-primary mb-2",
          onClick: _cache[1] || (_cache[1] = withModifiers((...args) => $options.resolve && $options.resolve(...args), ["prevent"]))
        }, [
          createVNode(_component_faicon, { icon: "thumbs-up" }),
          _hoisted_5$1
        ]))
      ]),
      createVNode("div", _hoisted_6$1, [
        _hoisted_7$1,
        createVNode(_component_router_link, {
          to: { name: "RouteAppsShow", params: { id: $data.app.Id } },
          textContent: toDisplayString($data.app.Name)
        }, null, 8, ["to", "textContent"]),
        _hoisted_8$1,
        createVNode("span", {
          textContent: toDisplayString($data.problem.Location)
        }, null, 8, ["textContent"])
      ]),
      createVNode("div", _hoisted_9$1, [
        _hoisted_10$1,
        createVNode("span", {
          textContent: toDisplayString($data.problem.Environment)
        }, null, 8, ["textContent"]),
        _hoisted_11$1,
        createVNode("span", {
          textContent: toDisplayString(_ctx.formatTime($data.problem.FirstNoticeAt))
        }, null, 8, ["textContent"]),
        _hoisted_12,
        createVNode("span", {
          textContent: toDisplayString(_ctx.formatTime($data.problem.LastNoticeAt))
        }, null, 8, ["textContent"]),
        $data.problem.ResolvedAt ? (openBlock(), createBlock(Fragment, { key: 0 }, [
          _hoisted_13,
          createVNode("span", {
            textContent: toDisplayString(_ctx.formatTime($data.problem.ResolvedAt))
          }, null, 8, ["textContent"])
        ], 64)) : createCommentVNode("", true)
      ])
    ]),
    createVNode("h3", {
      textContent: toDisplayString($data.notice.Message)
    }, null, 8, ["textContent"]),
    createVNode("div", _hoisted_14, [
      $data.nav && !($data.nav.Older === null && $data.nav.Newer === null) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
        createVNode("div", _hoisted_15, [
          $data.nav.Older === null ? (openBlock(), createBlock("span", _hoisted_16, "\u2190 Older")) : (openBlock(), createBlock(_component_router_link, {
            key: 1,
            to: {
              name: "RouteNoticesShow",
              params: { id: $data.app.Id, pid: $data.problem.Id, nid: $data.nav.Older }
            }
          }, {
            default: _withId$1(() => [
              _hoisted_17
            ]),
            _: 1
          }, 8, ["to"]))
        ]),
        createVNode("div", _hoisted_18, [
          $data.nav.Newer === null ? (openBlock(), createBlock("span", _hoisted_19, "Newer \u2192")) : (openBlock(), createBlock(_component_router_link, {
            key: 1,
            to: {
              name: "RouteNoticesShow",
              params: { id: $data.app.Id, pid: $data.problem.Id, nid: $data.nav.Newer }
            }
          }, {
            default: _withId$1(() => [
              _hoisted_20
            ]),
            _: 1
          }, 8, ["to"]))
        ])
      ], 64)) : createCommentVNode("", true),
      createVNode("div", null, [
        _hoisted_21,
        $data.nav && $data.nav.Number ? (openBlock(), createBlock("span", {
          key: 0,
          textContent: toDisplayString($data.nav.Number)
        }, null, 8, ["textContent"])) : createCommentVNode("", true),
        _hoisted_22,
        createVNode("span", {
          textContent: toDisplayString($data.problem.NoticesCount)
        }, null, 8, ["textContent"])
      ])
    ]),
    createVNode("ul", _hoisted_23, [
      _hoisted_24,
      _hoisted_25,
      $options.hasUserAttributes ? (openBlock(), createBlock("li", _hoisted_26, [
        _hoisted_27
      ])) : createCommentVNode("", true),
      _hoisted_28
    ]),
    createVNode("div", _hoisted_31, [
      createVNode("div", _hoisted_32, [
        createVNode("div", _hoisted_33, [
          createVNode("table", _hoisted_34, [
            createVNode("tbody", null, [
              createVNode("tr", null, [
                _hoisted_35,
                createVNode("td", null, [
                  createVNode("table", _hoisted_36, [
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList($data.problem.Messages, (item) => {
                        return openBlock(), createBlock("tr", null, [
                          createVNode("td", {
                            class: "pe-3",
                            textContent: toDisplayString(item.Percent)
                          }, null, 8, ["textContent"]),
                          createVNode("td", {
                            class: "fw-bold",
                            textContent: toDisplayString(item.Value)
                          }, null, 8, ["textContent"])
                        ]);
                      }), 256))
                    ])
                  ])
                ])
              ]),
              createVNode("tr", null, [
                _hoisted_37,
                createVNode("td", {
                  textContent: toDisplayString($data.notice.ErrorClass)
                }, null, 8, ["textContent"])
              ]),
              createVNode("tr", null, [
                _hoisted_38,
                createVNode("td", {
                  textContent: toDisplayString($data.notice.Url)
                }, null, 8, ["textContent"])
              ]),
              createVNode("tr", null, [
                _hoisted_39,
                createVNode("td", {
                  textContent: toDisplayString($data.notice.Location)
                }, null, 8, ["textContent"])
              ]),
              createVNode("tr", null, [
                _hoisted_40,
                createVNode("td", {
                  textContent: toDisplayString(_ctx.formatTime($data.notice.CreatedAt))
                }, null, 8, ["textContent"])
              ]),
              createVNode("tr", null, [
                _hoisted_41,
                createVNode("td", {
                  textContent: toDisplayString($data.problem.NoticesCount - 1)
                }, null, 8, ["textContent"])
              ]),
              createVNode("tr", null, [
                _hoisted_42,
                createVNode("td", null, [
                  createVNode("table", _hoisted_43, [
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList($data.problem.UserAgents, (item) => {
                        return openBlock(), createBlock("tr", null, [
                          createVNode("td", {
                            class: "pe-3",
                            textContent: toDisplayString(item.Percent)
                          }, null, 8, ["textContent"]),
                          createVNode("td", {
                            class: "fw-bold",
                            textContent: toDisplayString(item.Value)
                          }, null, 8, ["textContent"])
                        ]);
                      }), 256))
                    ])
                  ])
                ])
              ]),
              createVNode("tr", null, [
                _hoisted_44,
                createVNode("td", null, [
                  createVNode("table", _hoisted_45, [
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList($data.problem.Hosts, (item) => {
                        return openBlock(), createBlock("tr", null, [
                          createVNode("td", {
                            class: "pe-3",
                            textContent: toDisplayString(item.Percent)
                          }, null, 8, ["textContent"]),
                          createVNode("td", {
                            class: "fw-bold",
                            textContent: toDisplayString(item.Value)
                          }, null, 8, ["textContent"])
                        ]);
                      }), 256))
                    ])
                  ])
                ])
              ]),
              createVNode("tr", null, [
                _hoisted_46,
                createVNode("td", {
                  textContent: toDisplayString($data.notice.AppServer)
                }, null, 8, ["textContent"])
              ]),
              $data.notice.AppVersion ? (openBlock(), createBlock("tr", _hoisted_47, [
                _hoisted_48,
                createVNode("td", {
                  textContent: toDisplayString($data.notice.AppVersion)
                }, null, 8, ["textContent"])
              ])) : createCommentVNode("", true),
              $data.notice.Framework ? (openBlock(), createBlock("tr", _hoisted_49, [
                _hoisted_50,
                createVNode("td", {
                  textContent: toDisplayString($data.notice.Framework)
                }, null, 8, ["textContent"])
              ])) : createCommentVNode("", true),
              createVNode("tr", null, [
                _hoisted_51,
                createVNode("td", {
                  textContent: toDisplayString($data.notice.ProjectRoot)
                }, null, 8, ["textContent"])
              ])
            ])
          ])
        ])
      ]),
      createVNode("div", _hoisted_52, [
        createVNode("div", _hoisted_53, [
          (openBlock(true), createBlock(Fragment, null, renderList($data.notice.Backtraces, (b) => {
            return openBlock(), createBlock("div", _hoisted_54, [
              createVNode("span", {
                textContent: toDisplayString(b.File)
              }, null, 8, ["textContent"]),
              b.Number ? (openBlock(), createBlock("span", {
                key: 0,
                textContent: toDisplayString(":" + b.Number)
              }, null, 8, ["textContent"])) : createCommentVNode("", true),
              b.Column ? (openBlock(), createBlock("span", {
                key: 1,
                textContent: toDisplayString(":" + b.Column)
              }, null, 8, ["textContent"])) : createCommentVNode("", true),
              _hoisted_55,
              createVNode("span", {
                textContent: toDisplayString(b.Method)
              }, null, 8, ["textContent"])
            ]);
          }), 256))
        ])
      ]),
      $options.hasUserAttributes ? (openBlock(), createBlock("div", _hoisted_56, [
        createVNode("div", _hoisted_57, [
          createVNode("table", _hoisted_58, [
            createVNode("tbody", null, [
              (openBlock(true), createBlock(Fragment, null, renderList($data.notice.UserAttributes, (value, key) => {
                return openBlock(), createBlock("tr", null, [
                  createVNode("th", {
                    textContent: toDisplayString(key)
                  }, null, 8, ["textContent"]),
                  createVNode("td", {
                    textContent: toDisplayString(value)
                  }, null, 8, ["textContent"])
                ]);
              }), 256))
            ])
          ])
        ])
      ])) : createCommentVNode("", true),
      createVNode("div", _hoisted_59, [
        createVNode("div", _hoisted_60, [
          createVNode("table", _hoisted_61, [
            createVNode("tbody", null, [
              (openBlock(true), createBlock(Fragment, null, renderList($data.notice.EnvVars, (value, key) => {
                return openBlock(), createBlock("tr", null, [
                  createVNode("th", {
                    textContent: toDisplayString(key)
                  }, null, 8, ["textContent"]),
                  createVNode("td", {
                    textContent: toDisplayString(value)
                  }, null, 8, ["textContent"])
                ]);
              }), 256))
            ])
          ])
        ])
      ]),
      createVNode("div", _hoisted_62, [
        createVNode("pre", {
          class: "p-3 bg-light border rounded-3 mb-4",
          textContent: toDisplayString($data.notice.Params)
        }, null, 8, ["textContent"])
      ]),
      createVNode("div", _hoisted_63, [
        createVNode("pre", {
          class: "p-3 bg-light border rounded-3 mb-4",
          textContent: toDisplayString($data.notice.Session)
        }, null, 8, ["textContent"])
      ])
    ])
  ], 64);
});
_sfc_main$1.render = _sfc_render$1;
_sfc_main$1.__scopeId = "data-v-318dacca";
var index_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = {
  computed: {
    statusCode() {
      let err = router.$lastError;
      if (!err)
        return 404;
      if (err && err.response) {
        return err.response.status;
      }
      return null;
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (!router.$lastRoute) {
      next({ name: "RouteHome" });
      return;
    }
    next();
  },
  beforeRouteEnter(to, from, next) {
    if (!router.$lastRoute) {
      next({ name: "RouteHome" });
      return;
    }
    next();
  }
};
const _withId = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-369a4d5c");
const _hoisted_1 = { class: "p-4" };
const _hoisted_2 = { class: "row" };
const _hoisted_3 = { class: "col-sm-6 offset-sm-3" };
const _hoisted_4 = { class: "card" };
const _hoisted_5 = { class: "card-body text-center" };
const _hoisted_6 = /* @__PURE__ */ createVNode("h3", null, "404", -1);
const _hoisted_7 = /* @__PURE__ */ createVNode("h5", null, "The webpage you visited does not exist.", -1);
const _hoisted_8 = /* @__PURE__ */ createVNode("h3", null, "403", -1);
const _hoisted_9 = /* @__PURE__ */ createVNode("h5", null, "You do not have permission to access this page.", -1);
const _hoisted_10 = /* @__PURE__ */ createVNode("h3", null, "500", -1);
const _hoisted_11 = /* @__PURE__ */ createVNode("h5", null, "Server error, unable to process request. Please try again later.", -1);
popScopeId();
const _sfc_render = /* @__PURE__ */ _withId((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createBlock("div", _hoisted_1, [
    createVNode("div", _hoisted_2, [
      createVNode("div", _hoisted_3, [
        createVNode("div", _hoisted_4, [
          createVNode("div", _hoisted_5, [
            $options.statusCode === 404 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
              _hoisted_6,
              _hoisted_7
            ], 64)) : $options.statusCode === 403 ? (openBlock(), createBlock(Fragment, { key: 1 }, [
              _hoisted_8,
              _hoisted_9
            ], 64)) : (openBlock(), createBlock(Fragment, { key: 2 }, [
              _hoisted_10,
              _hoisted_11
            ], 64)),
            _ctx.$router.$lastRoute ? (openBlock(), createBlock(_component_router_link, {
              key: 3,
              to: _ctx.$router.$lastRoute,
              class: "btn btn-primary mt-3",
              textContent: toDisplayString(`Try again: ${_ctx.$router.$lastRoute.fullPath}`)
            }, null, 8, ["to", "textContent"])) : createCommentVNode("", true)
          ])
        ])
      ])
    ])
  ]);
});
_sfc_main.render = _sfc_render;
_sfc_main.__scopeId = "data-v-369a4d5c";
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  history: createWebHistory(),
  routes: [
    { path: "/", name: "RouteHome", component: _sfc_main$9, alias: ["/apps"] },
    { path: "/apps/new", name: "RouteAppsNew", component: _sfc_main$4 },
    { path: "/apps/:id", name: "RouteAppsShow", component: _sfc_main$6 },
    { path: "/apps/:id/edit", name: "RouteAppsEdit", component: _sfc_main$3 },
    {
      path: "/apps/:id/problems/:pid/notices/:nid",
      name: "RouteNoticesShow",
      component: _sfc_main$1
    },
    {
      path: "/apps/:id/problems/:pid",
      name: "RouteProblemsShow",
      component: _sfc_main$1
    },
    { path: "/errors", name: "RouteProblems", component: _sfc_main$2 },
    { path: "/error", name: "RouteError", component: _sfc_main },
    { path: "/:pathMatch(.*)*", component: _sfc_main }
  ]
});
router.$lastRoute = null;
router.$lastError = null;
router.beforeEach((to, from, next) => {
  if (to.name === "RouteError")
    return next();
  router.$lastRoute = to;
  next();
});
router.onError((err) => {
  router.$lastError = err;
  router.push({ name: "RouteError" });
});
var validations = {
  fields: {
    Name: "Name",
    ApiKey: "API Key"
  },
  format: (field, message) => `${field}: ${message}`,
  string_eq: (p) => `length must be equal to ${p}`,
  string_gt: (p) => `length must be greater than ${p}`,
  string_gte: (p) => `length must be greater than or equal to ${p}`,
  string_lt: (p) => `length must be less than ${p}`,
  string_lte: (p) => `length must be less than or equal to ${p}`,
  string_ne: (p) => `length must not be ${p}`,
  string_uniqueness: (p) => `already exists`,
  string_required: (p) => `must not be blank`
};
var en_US = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  validations
});
let defaultLocale = "en_US";
if (window.localStorage) {
  let locale = window.localStorage.getItem("currentLocale");
  if (locale) {
    defaultLocale = locale;
  }
}
var i18n = {
  data() {
    return {
      currentLocale: defaultLocale
    };
  },
  methods: {
    $t(key, fallback = void 0) {
      let dict = en_US;
      let items = key.split(".");
      for (let i = 0; i < items.length; i++) {
        dict = dict[items[i]];
        if (!dict)
          break;
      }
      if (dict)
        return dict;
      console.debug("MISSING", key);
      if (fallback === void 0)
        return key;
      return fallback;
    }
  }
};
function pad0(n) {
  return n < 10 ? "0" + n : n;
}
var utils = {
  methods: {
    formatTime(time) {
      if (!time)
        return "-";
      let d = new Date(time);
      let ds = d.getFullYear() + "-" + pad0(d.getMonth() + 1) + "-" + pad0(d.getDate());
      let ts = pad0(d.getHours()) + ":" + pad0(d.getMinutes()) + ":" + pad0(d.getSeconds());
      return ds + " " + ts;
    },
    processErrors(err) {
      for (let key in this.$refs) {
        let elem = this.$refs[key];
        if (!(elem instanceof Array))
          elem = [elem];
        elem.forEach((e) => {
          if (e && e.classList)
            e.classList.remove("is-invalid");
        });
      }
      if (!err || !err.response || !err.response.data)
        return false;
      let errors = err.response.data.Errors;
      if (!errors || !errors.length)
        return false;
      let format2 = this.$t("validations.format");
      errors.forEach((error) => {
        let field = this.$t(`validations.fields.${error.FullName}`, null);
        if (!field)
          field = this.$t(`validations.fields.${error.Name}`, error.Name);
        let msg = this.$t(`validations.${error.Kind}_${error.Type}_${error.Name}`, null);
        if (!msg)
          msg = this.$t(`validations.${error.Kind}_${error.Type}`, null);
        if (!msg)
          msg = this.$t(`validations.${error.Type}`, error.Type);
        if (typeof msg === "function") {
          msg = msg(error.Param);
        }
        let message = format2(field, msg);
        let key = error.Name;
        let elem = this.$refs[key] || this.$refs["input-" + key];
        if (elem) {
          if (elem instanceof Array)
            elem = elem[0];
          let div = elem.nextElementSibling;
          if (!div || !div.classList || !div.classList.contains("invalid-feedback")) {
            let newDiv = document.createElement("div");
            newDiv.classList.add("invalid-feedback");
            elem.parentNode.insertBefore(newDiv, div);
            div = newDiv;
          }
          div.innerText = message;
          elem.classList.add("is-invalid");
        }
      });
      let firstErrorElem = document.querySelector(".is-invalid");
      if (firstErrorElem)
        firstErrorElem.focus();
      return true;
    }
  }
};
library.add(faThumbsUp, faCheckCircle);
const app = createApp(_sfc_main$b);
app.use(router);
app.use(VueToastificationPlugin).mixin({ methods: { $toast: useToast } });
app.mixin(i18n);
app.mixin(utils);
app.component("faicon", FontAwesomeIcon);
app.mount("body");

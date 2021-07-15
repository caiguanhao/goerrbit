import { r as ref, a as axios, u as useToast, o as openBlock, c as createBlock, b as createVNode, w as withCtx, F as Fragment, d as withModifiers, e as createCommentVNode, t as toDisplayString, f as resolveComponent, g as createTextVNode, h as renderList, i as renderSlot, p as pushScopeId, j as popScopeId, k as withDirectives, v as vModelText, l as withScopeId, m as reactive, n as watch, q as format, s as vModelCheckbox, x as vModelRadio, y as vModelSelect, z as vModelDynamic, M as Modal, A as resolveDirective, P as Popover, T as Tooltip, B as TransitionGroup, C as withKeys, D as createStaticVNode, N as NProgress, E as createRouter, G as createWebHistory, H as library, I as faThumbsUp, J as faCheckCircle, K as faCheck, L as faTimes, O as faCrown, Q as faCaretUp, R as faCaretDown, S as faTrashAlt, U as faEdit, V as createApp, W as VueToastificationPlugin, X as FontAwesomeIcon } from "./vendor.80ff6978.js";
var bootstrap_min = "";
var index = "";
const apiVersion = ref(null);
const http = axios.create({
  baseURL: "/api/admin",
  withCredentials: true,
  timeout: 3e3
});
http.interceptors.request.use((config) => {
  if (config.withCredentials) {
    let token = null;
    if (!token && window.sessionStorage) {
      token = window.sessionStorage.getItem("token");
    }
    if (!token && window.localStorage) {
      token = window.localStorage.getItem("token");
    }
    if (token) {
      config.headers.Authorization = token;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
http.interceptors.response.use((res) => {
  if (res.headers && res.headers["x-goerrbit-version"]) {
    apiVersion.value = res.headers["x-goerrbit-version"];
  }
  return res;
}, (error) => {
  if (error && error.response) {
    let res = error.response;
    if (res.status === 403) {
      useToast().error("No permission");
      error.toastShown = true;
    }
    if (res.headers && res.headers["x-goerrbit-version"]) {
      apiVersion.value = res.headers["x-goerrbit-version"];
    }
  }
  return Promise.reject(error);
});
http.apiVersion = apiVersion;
var App_vue_vue_type_style_index_0_lang = "";
const _sfc_main$p = {
  computed: {
    name() {
      if (http.apiVersion.value) {
        return `goerrbit ${http.apiVersion.value}`;
      }
      return "goerrbit";
    }
  },
  methods: {
    signOut() {
      http.post("/sign-out").then((res) => {
        if (window.sessionStorage)
          window.sessionStorage.removeItem("token");
        if (window.localStorage)
          window.localStorage.removeItem("token");
        let redirect = this.$route.fullPath;
        if (redirect === "/")
          redirect = void 0;
        this.$router.push({ name: "RouteSignIn", query: { redirect } }).then(() => {
          this.$toast().success("Successfully signed out");
        });
      }, () => {
        this.$toast().error("Error signing out");
      });
    }
  },
  created() {
    let lastElem = null;
    document.addEventListener("click", (e) => {
      if (!e.isTrusted)
        return;
      let defer = () => lastElem = null;
      if (window.getSelection().toString().length) {
        if (!e.shiftKey) {
          return defer();
        }
      }
      let el = e.target;
      while (el) {
        let node = el.nodeName;
        if (node === "A" || node === "BUTTON" || node === "INPUT") {
          if (node === "A" && el.getAttribute("href")) {
            let path = el.pathname + el.search + el.hash;
            if (this.$route.fullPath === path) {
              this.$router.replace({
                name: "RouteBlank"
              }).then(() => {
                this.$router.replace(path);
              });
            }
            return;
          }
          if (e.shiftKey && clickBetween(lastElem, el))
            return defer();
          lastElem = el;
          return;
        }
        if (el.classList && el.classList.contains("clickable-row")) {
          let elem = el.querySelector(".clickable-row-target") || el.querySelector("input[type=checkbox]") || el.querySelector("a");
          if (elem)
            elem.click();
          if (e.shiftKey && clickBetween(lastElem, elem))
            return defer();
          lastElem = elem;
          return;
        }
        el = el.parentNode;
      }
      return defer();
    });
  }
};
function clickBetween(a, b) {
  if (!a || !a.classList.contains("shift-key-select"))
    return false;
  if (!b || !b.classList.contains("shift-key-select"))
    return false;
  let selection = window.getSelection();
  if (selection.empty)
    selection.empty();
  else if (selection.removeAllRanges)
    selection.removeAllRanges();
  let all = document.querySelectorAll(".shift-key-select");
  let inRange = false;
  for (let i = 0; i < all.length; i++) {
    if (all[i] === a || all[i] === b) {
      inRange = !inRange;
      if (inRange)
        continue;
      else
        break;
    }
    if (inRange)
      setTimeout(() => all[i].click());
  }
  return true;
}
const _hoisted_1$l = { class: "navbar navbar-expand-md navbar-dark fixed-top bg-dark" };
const _hoisted_2$i = { class: "container-fluid" };
const _hoisted_3$i = /* @__PURE__ */ createTextVNode("Errbit");
const _hoisted_4$i = /* @__PURE__ */ createVNode("button", {
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
const _hoisted_5$h = {
  class: "collapse navbar-collapse",
  id: "navbarCollapse"
};
const _hoisted_6$e = { class: "navbar-nav me-auto mb-2 mb-md-0" };
const _hoisted_7$e = { class: "nav-item" };
const _hoisted_8$e = /* @__PURE__ */ createTextVNode("Apps");
const _hoisted_9$d = { class: "nav-item" };
const _hoisted_10$c = /* @__PURE__ */ createTextVNode("Errors");
const _hoisted_11$9 = { class: "nav-item" };
const _hoisted_12$8 = /* @__PURE__ */ createTextVNode("Users");
const _hoisted_13$7 = { class: "navbar-nav mb-2 mb-md-0" };
const _hoisted_14$7 = { class: "nav-item" };
const _hoisted_15$6 = { class: "nav-item" };
const _hoisted_16$6 = { class: "flex-shrink-0" };
const _hoisted_17$6 = { class: "container" };
const _hoisted_18$6 = { class: "footer mt-auto py-3 bg-light" };
const _hoisted_19$5 = { class: "container" };
function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _component_faicon = resolveComponent("faicon");
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock(Fragment, null, [
    createVNode("header", null, [
      createVNode("nav", _hoisted_1$l, [
        createVNode("div", _hoisted_2$i, [
          createVNode(_component_router_link, {
            class: "navbar-brand",
            to: { name: "RouteHome" }
          }, {
            default: withCtx(() => [
              _hoisted_3$i
            ]),
            _: 1
          }),
          _ctx.currentUser.Id ? (openBlock(), createBlock(Fragment, { key: 0 }, [
            _hoisted_4$i,
            createVNode("div", _hoisted_5$h, [
              createVNode("ul", _hoisted_6$e, [
                createVNode("li", _hoisted_7$e, [
                  createVNode(_component_router_link, {
                    class: "nav-link",
                    "active-class": "active",
                    to: { name: "RouteHome" }
                  }, {
                    default: withCtx(() => [
                      _hoisted_8$e
                    ]),
                    _: 1
                  })
                ]),
                createVNode("li", _hoisted_9$d, [
                  createVNode(_component_router_link, {
                    class: "nav-link",
                    "active-class": "active",
                    to: { name: "RouteProblems" }
                  }, {
                    default: withCtx(() => [
                      _hoisted_10$c
                    ]),
                    _: 1
                  })
                ]),
                createVNode("li", _hoisted_11$9, [
                  createVNode(_component_router_link, {
                    class: "nav-link",
                    "active-class": "active",
                    to: { name: "RouteUsers" }
                  }, {
                    default: withCtx(() => [
                      _hoisted_12$8
                    ]),
                    _: 1
                  })
                ])
              ]),
              createVNode("ul", _hoisted_13$7, [
                createVNode("li", _hoisted_14$7, [
                  createVNode(_component_router_link, {
                    to: { name: "RouteUsersEdit", params: { id: _ctx.currentUser.Id } },
                    class: "nav-link user-name"
                  }, {
                    default: withCtx(() => [
                      _ctx.currentUser.IsAdmin ? (openBlock(), createBlock(_component_faicon, {
                        key: 0,
                        class: "me-2",
                        icon: "crown",
                        title: "User is an admin"
                      })) : createCommentVNode("", true),
                      createVNode("span", {
                        textContent: toDisplayString(_ctx.currentUser.Name)
                      }, null, 8, ["textContent"])
                    ]),
                    _: 1
                  }, 8, ["to"])
                ]),
                createVNode("li", _hoisted_15$6, [
                  createVNode("a", {
                    href: "",
                    class: "nav-link",
                    onClick: _cache[1] || (_cache[1] = withModifiers((...args) => $options.signOut && $options.signOut(...args), ["prevent"]))
                  }, "Sign Out")
                ])
              ])
            ])
          ], 64)) : createCommentVNode("", true)
        ])
      ])
    ]),
    createVNode("main", _hoisted_16$6, [
      createVNode("div", _hoisted_17$6, [
        createVNode(_component_router_view)
      ])
    ]),
    createVNode("footer", _hoisted_18$6, [
      createVNode("div", _hoisted_19$5, [
        createVNode("a", {
          class: "text-muted text-decoration-none small",
          href: "https://github.com/caiguanhao/goerrbit",
          target: "_blank",
          textContent: toDisplayString($options.name)
        }, null, 8, ["textContent"])
      ])
    ])
  ], 64);
}
_sfc_main$p.render = _sfc_render$o;
var nprogress = "";
var pagination_vue_vue_type_style_index_0_lang = "";
const _sfc_main$o = {
  props: {
    pagination: Object,
    hash: String
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
const _hoisted_1$k = { class: "pagination justify-content-center" };
const _hoisted_2$h = /* @__PURE__ */ createTextVNode("Previous");
const _hoisted_3$h = {
  key: 1,
  class: "page-link"
};
const _hoisted_4$h = /* @__PURE__ */ createTextVNode("Next");
const _hoisted_5$g = {
  key: 1,
  class: "page-link"
};
function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createBlock("ul", _hoisted_1$k, [
    createVNode("li", {
      class: ["page-item", { disabled: !$props.pagination.PrevPage }]
    }, [
      $props.pagination.PrevPage ? (openBlock(), createBlock(_component_router_link, {
        key: 0,
        class: "page-link",
        to: { hash: $props.hash, query: $options.queryForPage($props.pagination.PrevPage) }
      }, {
        default: withCtx(() => [
          _hoisted_2$h
        ]),
        _: 1
      }, 8, ["to"])) : (openBlock(), createBlock("span", _hoisted_3$h, "Previous"))
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
          to: { hash: $props.hash, query: $options.queryForPage(page) },
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
        to: { hash: $props.hash, query: $options.queryForPage($props.pagination.NextPage) }
      }, {
        default: withCtx(() => [
          _hoisted_4$h
        ]),
        _: 1
      }, 8, ["to"])) : (openBlock(), createBlock("span", _hoisted_5$g, "Next"))
    ], 2)
  ]);
}
_sfc_main$o.render = _sfc_render$n;
const _sfc_main$n = {
  props: {
    sort: String,
    defaultOrder: String,
    pagination: Object
  },
  computed: {
    isCurrent() {
      return this.pagination.Sort === this.sort;
    },
    isASC() {
      return this.pagination.Order === "asc";
    },
    to() {
      let query = JSON.parse(JSON.stringify(this.$route.query));
      if (this.isCurrent) {
        query.order = this.isASC ? "desc" : "asc";
      } else {
        if (this.defaultOrder)
          query.order = this.defaultOrder;
      }
      query.sort = this.sort;
      return { query };
    }
  }
};
function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_faicon = resolveComponent("faicon");
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createBlock(_component_router_link, { to: $options.to }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default"),
      $options.isCurrent ? (openBlock(), createBlock(_component_faicon, {
        key: 0,
        class: "ms-1",
        icon: $options.isASC ? "caret-up" : "caret-down"
      }, null, 8, ["icon"])) : createCommentVNode("", true)
    ]),
    _: 3
  }, 8, ["to"]);
}
_sfc_main$n.render = _sfc_render$m;
var index_vue_vue_type_style_index_0_scoped_true_lang$3 = "";
const _sfc_main$m = {
  data() {
    return {
      apps: [],
      pagination: {},
      lastAppId: null,
      query: null
    };
  },
  components: {
    Pagination: _sfc_main$o,
    SortButton: _sfc_main$n
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
    },
    count(c) {
      if (!c) {
        return "0 enabled";
      }
      if (c.Enabled > 0 && c.Disabled > 0) {
        return `${c.Enabled} enabled, ${c.Disabled} disabled`;
      }
      if (c.Enabled === 0 && c.Disabled > 0) {
        return `${c.Disabled} disabled`;
      }
      return `${c.Enabled} enabled`;
    }
  },
  beforeRouteEnter(to, from, next) {
    http.get("/apps", { params: to.query }).then((res) => {
      next((vm2) => {
        vm2.apps = res.data.Apps;
        vm2.pagination = res.data.Pagination;
        vm2.query = to.query.query;
        vm2.load();
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
const _withId$g = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-8182bf82");
const _hoisted_1$j = { class: "p-3 bg-light border rounded-3 mb-4 d-sm-flex align-items-center justify-content-between" };
const _hoisted_2$g = /* @__PURE__ */ createVNode("div", { class: "mb-3 mb-sm-0" }, [
  /* @__PURE__ */ createVNode("h4", null, "Apps")
], -1);
const _hoisted_3$g = /* @__PURE__ */ createTextVNode("Add a New App");
const _hoisted_4$g = {
  key: 0,
  class: "mb-0 text-muted"
};
const _hoisted_5$f = { class: "d-sm-flex align-items-center justify-content-end" };
const _hoisted_6$d = { class: "input-group" };
const _hoisted_7$d = /* @__PURE__ */ createVNode("button", {
  class: "btn btn-outline-secondary",
  type: "submit"
}, "Search", -1);
const _hoisted_8$d = { class: "table-responsive" };
const _hoisted_9$c = { class: "table" };
const _hoisted_10$b = /* @__PURE__ */ createTextVNode("NAME");
const _hoisted_11$8 = /* @__PURE__ */ createVNode("th", { width: "20%" }, "NOTIFY", -1);
const _hoisted_12$7 = /* @__PURE__ */ createVNode("th", { width: "20%" }, "ERRORS", -1);
popScopeId();
const _sfc_render$l = /* @__PURE__ */ _withId$g((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_router_link = resolveComponent("router-link");
  const _component_SortButton = resolveComponent("SortButton");
  const _component_Pagination = resolveComponent("Pagination");
  return openBlock(), createBlock(Fragment, null, [
    createVNode("div", _hoisted_1$j, [
      _hoisted_2$g,
      createVNode("div", null, [
        _ctx.currentUser.IsAdmin ? (openBlock(), createBlock(_component_router_link, {
          key: 0,
          to: { name: "RouteAppsNew" },
          class: "btn btn-primary"
        }, {
          default: _withId$g(() => [
            _hoisted_3$g
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ])
    ]),
    $data.pagination.TotalCount === 0 && !$options.isSearch ? (openBlock(), createBlock("h5", _hoisted_4$g, "No apps have been created yet")) : (openBlock(), createBlock(Fragment, { key: 1 }, [
      createVNode("div", _hoisted_5$f, [
        createVNode("form", {
          class: "mb-3",
          onSubmit: _cache[2] || (_cache[2] = withModifiers((...args) => $options.search && $options.search(...args), ["prevent"]))
        }, [
          createVNode("div", _hoisted_6$d, [
            withDirectives(createVNode("input", {
              type: "text",
              class: "form-control",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.query = $event)
            }, null, 512), [
              [vModelText, $data.query]
            ]),
            _hoisted_7$d
          ])
        ], 32)
      ]),
      createVNode("div", _hoisted_8$d, [
        createVNode("table", _hoisted_9$c, [
          createVNode("thead", null, [
            createVNode("tr", null, [
              createVNode("th", null, [
                createVNode(_component_SortButton, {
                  sort: "name",
                  pagination: $data.pagination
                }, {
                  default: _withId$g(() => [
                    _hoisted_10$b
                  ]),
                  _: 1
                }, 8, ["pagination"])
              ]),
              _hoisted_11$8,
              _hoisted_12$7
            ])
          ]),
          createVNode("tbody", null, [
            (openBlock(true), createBlock(Fragment, null, renderList($data.apps, (app2) => {
              return openBlock(), createBlock("tr", {
                class: ["clickable-row", { highlighted: $data.lastAppId === app2.Id }]
              }, [
                createVNode("td", null, [
                  createVNode(_component_router_link, {
                    to: { name: "RouteAppsShow", params: { id: app2.Id } },
                    class: "name text-break",
                    textContent: toDisplayString(app2.Name)
                  }, null, 8, ["to", "textContent"])
                ]),
                createVNode("td", null, [
                  createVNode(_component_router_link, {
                    to: { name: "RouteAppsNotifications", params: { id: app2.Id } },
                    textContent: toDisplayString($options.count(app2.NotificationServicesCount))
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
_sfc_main$m.render = _sfc_render$l;
_sfc_main$m.__scopeId = "data-v-8182bf82";
var problems_vue_vue_type_style_index_0_scoped_true_lang = "";
let show = window.sessionStorage ? window.sessionStorage.getItem("selections.show") === "1" : false;
const selections = reactive({
  show,
  problemIds: []
});
watch(() => selections.show, (val) => {
  if (!window.sessionStorage)
    return;
  if (val) {
    window.sessionStorage.setItem("selections.show", "1");
  } else {
    window.sessionStorage.removeItem("selections.show");
  }
});
const _sfc_main$l = {
  props: {
    response: Object,
    showingResolved: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    "reload"
  ],
  components: {
    Pagination: _sfc_main$o,
    SortButton: _sfc_main$n
  },
  data() {
    return {
      lastProblemId: null,
      updated: {
        ids: [],
        type: null
      },
      toUpdate: {
        ids: [],
        type: null
      },
      selections
    };
  },
  watch: {
    problems() {
      this.lastProblemId = window.lastProblemId;
      window.lastProblemId = null;
      let ids = this.problems.map((p) => p.Id);
      let allOK = selections.problemIds.every((id) => ids.indexOf(id) > -1);
      if (!allOK) {
        selections.problemIds = [];
      }
      this.updated.ids = this.toUpdate.ids;
      this.updated.type = this.toUpdate.type;
      this.toUpdate.ids = [];
      this.toUpdate.type = null;
    }
  },
  computed: {
    apps() {
      return this.response.Apps || [];
    },
    comments() {
      return this.response.Comments || [];
    },
    problems() {
      return this.response.Problems || [];
    },
    pagination() {
      return this.response.Pagination || {};
    },
    appNames() {
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
    },
    hasUndo() {
      if (!this.updated)
        return false;
      let type = this.updated.type;
      let ids = this.updated.ids;
      if (!type || !ids || !ids.length)
        return false;
      if (type === "resolved" || type === "unresolved") {
        return true;
      }
      return false;
    }
  },
  methods: {
    commentFor(problemId) {
      return this.comments.find((c) => c.ProblemId === problemId);
    },
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
      }, (error) => {
        if (!error || !error.toastShown) {
          this.$toast().error("Error resolving issue");
        }
      });
    },
    selectAll() {
      selections.show = true;
      selections.problemIds = this.problems.map((p) => p.Id);
    },
    clear() {
      selections.show = true;
      selections.problemIds = [];
    },
    setAsResolved(ids = null, fromUndo = false) {
      http.post("/problems/resolve", {
        ids: ids || selections.problemIds
      }).then((res) => {
        this.$emit("reload");
        if (fromUndo) {
          this.toUpdate.ids = [];
          this.toUpdate.type = null;
        } else {
          this.toUpdate.ids = res.data.Changed;
          this.toUpdate.type = "resolved";
        }
      }, (error) => {
        if (!error || !error.toastShown) {
          this.$toast().error("Error resolving issues");
        }
      });
    },
    setAsUnresolved(ids = null, fromUndo = false) {
      http.post("/problems/unresolve", {
        ids: ids || selections.problemIds
      }).then((res) => {
        this.$emit("reload");
        if (fromUndo) {
          this.toUpdate.ids = [];
          this.toUpdate.type = null;
        } else {
          this.toUpdate.ids = res.data.Changed;
          this.toUpdate.type = "unresolved";
        }
      }, (error) => {
        if (!error || !error.toastShown) {
          this.$toast().error("Error unresolving issues");
        }
      });
    },
    undo() {
      if (!this.hasUndo)
        return;
      let type = this.updated.type;
      let ids = this.updated.ids;
      if (type === "resolved") {
        this.setAsUnresolved(ids, true);
      } else if (type === "unresolved") {
        this.setAsResolved(ids, true);
      } else {
        this.$toast().error("Error");
      }
    },
    merge() {
      if (!window.confirm("Merge selected issues?"))
        return;
      http.post("/problems/merge", {
        ids: selections.problemIds
      }).then((res) => {
        this.$emit("reload");
        this.$toast().success("Successfully merged issues");
      }, (error) => {
        if (!error || !error.toastShown) {
          this.$toast().error("Error merging issues");
        }
      });
    },
    unmerge() {
      if (!window.confirm("Unmerge selected issues?"))
        return;
      http.post("/problems/unmerge", {
        ids: selections.problemIds
      }).then((res) => {
        selections.problemIds = [];
        this.$emit("reload");
        this.$toast().success("Successfully unmerged issues");
      }, (error) => {
        if (!error || !error.toastShown) {
          this.$toast().error("Error unmerging issues");
        }
      });
    },
    remove() {
      if (!window.confirm("Permanently delete selected issues? This action CANNOT be undone."))
        return;
      http.delete("/problems", {
        data: {
          ids: selections.problemIds
        }
      }).then((res) => {
        this.$emit("reload");
        this.$toast().success("Successfully deleted issues");
      }, (error) => {
        if (!error || !error.toastShown) {
          this.$toast().error("Error deleting issues");
        }
      });
    }
  }
};
const _withId$f = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-5a66a3f8");
const _hoisted_1$i = {
  key: 0,
  class: "d-flex justify-content-center mb-3"
};
const _hoisted_2$f = { class: "bg-dark text-white py-2 px-3 rounded-3" };
const _hoisted_3$f = {
  key: 0,
  class: "mb-0 text-muted"
};
const _hoisted_4$f = { class: "btn-group btn-group-sm" };
const _hoisted_5$e = /* @__PURE__ */ createVNode("button", {
  type: "button",
  class: "btn btn-secondary dropdown-toggle dropdown-toggle-split",
  "data-bs-toggle": "dropdown",
  "data-bs-reference": "parent"
}, [
  /* @__PURE__ */ createVNode("span", { class: "visually-hidden" }, "Toggle Dropdown")
], -1);
const _hoisted_6$c = { class: "dropdown-menu" };
const _hoisted_7$c = /* @__PURE__ */ createVNode("li", null, [
  /* @__PURE__ */ createVNode("hr", { class: "dropdown-divider" })
], -1);
const _hoisted_8$c = { class: "d-flex justify-content-between" };
const _hoisted_9$b = { key: 0 };
const _hoisted_10$a = { key: 1 };
const _hoisted_11$7 = { class: "table-responsive" };
const _hoisted_12$6 = { class: "table" };
const _hoisted_13$6 = {
  key: 0,
  width: "1%"
};
const _hoisted_14$6 = { width: "18%" };
const _hoisted_15$5 = { key: 0 };
const _hoisted_16$5 = { key: 1 };
const _hoisted_17$5 = /* @__PURE__ */ createTextVNode("WHAT / WHERE");
const _hoisted_18$5 = { width: "15%" };
const _hoisted_19$4 = /* @__PURE__ */ createTextVNode("LATEST");
const _hoisted_20$4 = { width: "10%" };
const _hoisted_21$3 = /* @__PURE__ */ createTextVNode("COUNT");
const _hoisted_22$3 = /* @__PURE__ */ createVNode("th", { width: "10%" }, "RESOLVE", -1);
const _hoisted_23$3 = { key: 0 };
const _hoisted_24$3 = {
  key: 0,
  class: "d-flex align-items-end"
};
const _hoisted_25$3 = { class: "ms-1" };
const _hoisted_26$3 = { key: 1 };
const _hoisted_27$3 = {
  key: 1,
  class: "text-success fst-italic"
};
popScopeId();
const _sfc_render$k = /* @__PURE__ */ _withId$f((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_SortButton = resolveComponent("SortButton");
  const _component_router_link = resolveComponent("router-link");
  const _component_faicon = resolveComponent("faicon");
  const _component_Pagination = resolveComponent("Pagination");
  return openBlock(), createBlock(Fragment, null, [
    $options.hasUndo ? (openBlock(), createBlock("div", _hoisted_1$i, [
      createVNode("span", _hoisted_2$f, [
        createVNode("span", {
          textContent: toDisplayString(`${$data.updated.ids.length} problems marked as ${$data.updated.type === "resolved" ? "resolved" : "unresolved"}.`)
        }, null, 8, ["textContent"]),
        createVNode("a", {
          href: "",
          class: "ms-3 text-white",
          onClick: _cache[1] || (_cache[1] = withModifiers((...args) => $options.undo && $options.undo(...args), ["prevent"]))
        }, "Undo")
      ])
    ])) : createCommentVNode("", true),
    $options.hasNoProblems ? (openBlock(), createBlock(Fragment, { key: 1 }, [
      $options.isSearch ? (openBlock(), createBlock("h5", _hoisted_3$f, "No errors matched your query")) : renderSlot(_ctx.$slots, "default", { key: 1 }, void 0, true)
    ], 64)) : (openBlock(), createBlock(Fragment, { key: 2 }, [
      createVNode("div", _hoisted_4$f, [
        createVNode("button", {
          type: "button",
          class: "btn btn-secondary",
          onClick: _cache[2] || (_cache[2] = withModifiers(($event) => $data.selections.show = !$data.selections.show, ["prevent"])),
          textContent: toDisplayString($data.selections.show ? "Selection: ON" : "Selection: OFF")
        }, null, 8, ["textContent"]),
        _hoisted_5$e,
        createVNode("ul", _hoisted_6$c, [
          createVNode("li", null, [
            createVNode("a", {
              class: "dropdown-item",
              href: "",
              onClick: _cache[3] || (_cache[3] = withModifiers(($event) => $options.selectAll(), ["prevent"]))
            }, "Select All On This Page")
          ]),
          _hoisted_7$c,
          createVNode("li", _hoisted_8$c, [
            createVNode("h6", {
              class: "dropdown-header",
              textContent: toDisplayString(`SELECTED: ${$data.selections.problemIds.length}`)
            }, null, 8, ["textContent"]),
            $data.selections.problemIds.length ? (openBlock(), createBlock("a", {
              key: 0,
              class: "small h6 mb-0 py-2 pe-3",
              href: "",
              onClick: _cache[4] || (_cache[4] = withModifiers(($event) => $options.clear(), ["prevent"]))
            }, "Clear")) : createCommentVNode("", true)
          ]),
          $props.showingResolved ? (openBlock(), createBlock("li", _hoisted_9$b, [
            createVNode("a", {
              class: ["dropdown-item", { disabled: !$data.selections.problemIds.length }],
              href: "",
              onClick: _cache[5] || (_cache[5] = withModifiers(($event) => $options.setAsUnresolved(), ["prevent"]))
            }, "Mark As Unresolved", 2)
          ])) : (openBlock(), createBlock("li", _hoisted_10$a, [
            createVNode("a", {
              class: ["dropdown-item", { disabled: !$data.selections.problemIds.length }],
              href: "",
              onClick: _cache[6] || (_cache[6] = withModifiers(($event) => $options.setAsResolved(), ["prevent"]))
            }, "Mark As Resolved", 2)
          ])),
          createVNode("li", null, [
            createVNode("a", {
              class: ["dropdown-item", $data.selections.problemIds.length ? "text-danger" : "disabled"],
              href: "",
              onClick: _cache[7] || (_cache[7] = withModifiers(($event) => $options.merge(), ["prevent"]))
            }, "Merge", 2)
          ]),
          createVNode("li", null, [
            createVNode("a", {
              class: ["dropdown-item", $data.selections.problemIds.length ? "text-danger" : "disabled"],
              href: "",
              onClick: _cache[8] || (_cache[8] = withModifiers(($event) => $options.unmerge(), ["prevent"]))
            }, "Unmerge", 2)
          ]),
          createVNode("li", null, [
            createVNode("a", {
              class: ["dropdown-item", $data.selections.problemIds.length ? "text-danger" : "disabled"],
              href: "",
              onClick: _cache[9] || (_cache[9] = withModifiers(($event) => $options.remove(), ["prevent"]))
            }, "Delete", 2)
          ])
        ])
      ]),
      createVNode("div", _hoisted_11$7, [
        createVNode("table", _hoisted_12$6, [
          createVNode("thead", null, [
            createVNode("tr", null, [
              $data.selections.show ? (openBlock(), createBlock("th", _hoisted_13$6)) : createCommentVNode("", true),
              createVNode("th", _hoisted_14$6, [
                $options.apps ? (openBlock(), createBlock("div", _hoisted_15$5, "APP")) : (openBlock(), createBlock("div", _hoisted_16$5, "ENV"))
              ]),
              createVNode("th", null, [
                createVNode(_component_SortButton, {
                  sort: "message",
                  defaultOrder: "asc",
                  pagination: $options.pagination
                }, {
                  default: _withId$f(() => [
                    _hoisted_17$5
                  ]),
                  _: 1
                }, 8, ["pagination"])
              ]),
              createVNode("th", _hoisted_18$5, [
                createVNode(_component_SortButton, {
                  sort: "last_notice_at",
                  pagination: $options.pagination
                }, {
                  default: _withId$f(() => [
                    _hoisted_19$4
                  ]),
                  _: 1
                }, 8, ["pagination"])
              ]),
              createVNode("th", _hoisted_20$4, [
                createVNode(_component_SortButton, {
                  sort: "notices_count",
                  pagination: $options.pagination
                }, {
                  default: _withId$f(() => [
                    _hoisted_21$3
                  ]),
                  _: 1
                }, 8, ["pagination"])
              ]),
              _hoisted_22$3
            ])
          ]),
          createVNode("tbody", null, [
            (openBlock(true), createBlock(Fragment, null, renderList($options.problems, (problem) => {
              return openBlock(), createBlock("tr", {
                class: ["clickable-row", {
                  highlighted: $data.lastProblemId === problem.Id,
                  resolved: !$props.showingResolved && !!problem.ResolvedAt
                }]
              }, [
                $data.selections.show ? (openBlock(), createBlock("td", _hoisted_23$3, [
                  withDirectives(createVNode("input", {
                    type: "checkbox",
                    class: "clickable-row-target shift-key-select",
                    "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.selections.problemIds = $event),
                    value: problem.Id
                  }, null, 8, ["value"]), [
                    [vModelCheckbox, $data.selections.problemIds]
                  ])
                ])) : createCommentVNode("", true),
                createVNode("td", null, [
                  $options.apps ? (openBlock(), createBlock("div", _hoisted_24$3, [
                    createVNode(_component_router_link, {
                      to: { name: "RouteAppsShow", params: { id: problem.AppId } },
                      class: "app-name",
                      textContent: toDisplayString($options.appNames[problem.AppId])
                    }, null, 8, ["to", "textContent"]),
                    createVNode("small", _hoisted_25$3, [
                      createVNode(_component_router_link, {
                        to: { query: { environment: problem.Environment } },
                        class: "small",
                        textContent: toDisplayString(problem.Environment)
                      }, null, 8, ["to", "textContent"])
                    ])
                  ])) : (openBlock(), createBlock("div", _hoisted_26$3, [
                    createVNode(_component_router_link, {
                      to: { query: { environment: problem.Environment } },
                      textContent: toDisplayString(problem.Environment)
                    }, null, 8, ["to", "textContent"])
                  ]))
                ]),
                createVNode("td", null, [
                  createVNode(_component_router_link, {
                    to: { name: "RouteProblemsShow", params: { id: problem.AppId, pid: problem.Id } },
                    class: "clickable-row-target message text-break",
                    textContent: toDisplayString(problem.Message || "(empty)")
                  }, null, 8, ["to", "textContent"]),
                  problem.Location ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "small fst-italic text-muted",
                    textContent: toDisplayString(problem.Location)
                  }, null, 8, ["textContent"])) : createCommentVNode("", true),
                  $options.commentFor(problem.Id) ? (openBlock(), createBlock(_component_router_link, {
                    key: 1,
                    to: { name: "RouteProblemsShow", params: { id: problem.AppId, pid: problem.Id }, hash: "#comments" },
                    class: "comment-btn"
                  }, {
                    default: _withId$f(() => [
                      createVNode("strong", {
                        textContent: toDisplayString($options.commentFor(problem.Id).UserName + ":")
                      }, null, 8, ["textContent"]),
                      createVNode("span", {
                        class: "ms-2",
                        textContent: toDisplayString($options.commentFor(problem.Id).Body)
                      }, null, 8, ["textContent"])
                    ]),
                    _: 2
                  }, 1032, ["to"])) : createCommentVNode("", true)
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
                  ], 8, ["onClick"])) : (openBlock(), createBlock("small", _hoisted_27$3, "(resolved)"))
                ])
              ], 2);
            }), 256))
          ])
        ])
      ]),
      $options.pagination.TotalPages > 1 ? (openBlock(), createBlock(_component_Pagination, {
        key: 0,
        pagination: $options.pagination
      }, null, 8, ["pagination"])) : createCommentVNode("", true)
    ], 64))
  ], 64);
});
_sfc_main$l.render = _sfc_render$k;
_sfc_main$l.__scopeId = "data-v-5a66a3f8";
const _sfc_main$k = {
  data() {
    return {
      query: null
    };
  },
  watch: {
    "$route.query.query": {
      immediate: true,
      handler(value) {
        this.query = value;
      }
    }
  },
  methods: {
    search() {
      this.$router.push({
        name: this.$route.name,
        query: {
          status: this.$route.query.status,
          environment: this.$route.query.environment,
          query: this.query || void 0
        }
      });
    }
  }
};
const _hoisted_1$h = { class: "d-sm-flex align-items-center justify-content-between" };
const _hoisted_2$e = { class: "btn-group mb-3" };
const _hoisted_3$e = { class: "dropdown-menu" };
const _hoisted_4$e = { key: 0 };
const _hoisted_5$d = /* @__PURE__ */ createTextVNode("Unresolved Errors");
const _hoisted_6$b = { key: 1 };
const _hoisted_7$b = /* @__PURE__ */ createTextVNode("Resolved Errors");
const _hoisted_8$b = { class: "input-group" };
const _hoisted_9$a = /* @__PURE__ */ createVNode("button", {
  class: "btn btn-outline-secondary",
  type: "submit"
}, "Search", -1);
function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createBlock("div", _hoisted_1$h, [
    createVNode("div", _hoisted_2$e, [
      createVNode("button", {
        class: "btn btn-outline-secondary dropdown-toggle",
        type: "button",
        "data-bs-toggle": "dropdown",
        "aria-expanded": "false",
        textContent: toDisplayString(_ctx.$route.query.status === "resolved" ? "Resolved Errors" : "Unresolved Errors")
      }, null, 8, ["textContent"]),
      createVNode("ul", _hoisted_3$e, [
        _ctx.$route.query.status === "resolved" ? (openBlock(), createBlock("li", _hoisted_4$e, [
          createVNode(_component_router_link, {
            class: "dropdown-item",
            to: { query: { query: _ctx.$route.query.query } }
          }, {
            default: withCtx(() => [
              _hoisted_5$d
            ]),
            _: 1
          }, 8, ["to"])
        ])) : (openBlock(), createBlock("li", _hoisted_6$b, [
          createVNode(_component_router_link, {
            class: "dropdown-item",
            to: { query: { query: _ctx.$route.query.query, status: "resolved" } }
          }, {
            default: withCtx(() => [
              _hoisted_7$b
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
      createVNode("div", _hoisted_8$b, [
        withDirectives(createVNode("input", {
          type: "text",
          class: "form-control",
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.query = $event)
        }, null, 512), [
          [vModelText, $data.query]
        ]),
        _hoisted_9$a
      ])
    ], 32)
  ]);
}
_sfc_main$k.render = _sfc_render$j;
var show_vue_vue_type_style_index_0_scoped_true_lang$1 = "";
const _sfc_main$j = {
  components: {
    Problems: _sfc_main$l,
    ProblemsHeader: _sfc_main$k
  },
  data() {
    return {
      app: {},
      response: {}
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
    },
    reload() {
      http.get(`/apps/${this.$route.params.id}/problems`, {
        params: this.$route.query
      }).then((res) => {
        this.response = res.data;
        this.load();
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      http.get(`/apps/${to.params.id}`),
      http.get(`/apps/${to.params.id}/problems`, { params: to.query })
    ]).then((res) => {
      next((vm2) => {
        vm2.app = res[0].data.App;
        vm2.response = res[1].data;
        vm2.load();
      });
    }, next);
  },
  beforeRouteUpdate(to, from, next) {
    Promise.all([
      http.get(`/apps/${to.params.id}`),
      http.get(`/apps/${to.params.id}/problems`, { params: to.query })
    ]).then((res) => {
      this.app = res[0].data.App;
      this.response = res[1].data;
      this.load();
      next();
    }, next);
  }
};
const _withId$e = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-776eddcc");
const _hoisted_1$g = { class: "p-3 bg-light border rounded-3 mb-4 d-sm-flex align-items-center justify-content-between" };
const _hoisted_2$d = { class: "mb-3 mb-sm-0" };
const _hoisted_3$d = { class: "small" };
const _hoisted_4$d = /* @__PURE__ */ createVNode("strong", null, "Errors Caught:", -1);
const _hoisted_5$c = /* @__PURE__ */ createTextVNode();
const _hoisted_6$a = /* @__PURE__ */ createVNode("strong", { class: "ms-3" }, "API Key:", -1);
const _hoisted_7$a = /* @__PURE__ */ createTextVNode();
const _hoisted_8$a = /* @__PURE__ */ createTextVNode("Edit");
const _hoisted_9$9 = {
  key: 0,
  class: "mb-0 text-muted"
};
const _hoisted_10$9 = /* @__PURE__ */ createVNode("h5", { class: "mb-3 text-muted" }, "No errors have been caught yet, make sure you set up your app", -1);
popScopeId();
const _sfc_render$i = /* @__PURE__ */ _withId$e((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_router_link = resolveComponent("router-link");
  const _component_ProblemsHeader = resolveComponent("ProblemsHeader");
  const _component_Problems = resolveComponent("Problems");
  return openBlock(), createBlock(Fragment, null, [
    createVNode("div", _hoisted_1$g, [
      createVNode("div", _hoisted_2$d, [
        createVNode("h4", {
          class: "text-break",
          textContent: toDisplayString($data.app.Name)
        }, null, 8, ["textContent"]),
        createVNode("div", _hoisted_3$d, [
          _hoisted_4$d,
          _hoisted_5$c,
          createVNode("span", {
            textContent: toDisplayString($data.app.ProblemsCount)
          }, null, 8, ["textContent"]),
          _hoisted_6$a,
          _hoisted_7$a,
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
          default: _withId$e(() => [
            _hoisted_8$a
          ]),
          _: 1
        }, 8, ["to"])
      ])
    ]),
    createVNode(_component_ProblemsHeader),
    createVNode(_component_Problems, {
      response: $data.response,
      showingResolved: _ctx.$route.query.status === "resolved",
      onReload: $options.reload
    }, {
      default: _withId$e(() => [
        _ctx.$route.query.status === "resolved" ? (openBlock(), createBlock("h5", _hoisted_9$9, "No errors have been caught yet")) : (openBlock(), createBlock(Fragment, { key: 1 }, [
          _hoisted_10$9,
          createVNode("pre", {
            class: "p-3 bg-light border rounded-3 mb-4",
            textContent: toDisplayString($options.rubyCode)
          }, null, 8, ["textContent"])
        ], 64))
      ]),
      _: 1
    }, 8, ["response", "showingResolved", "onReload"])
  ], 64);
});
_sfc_main$j.render = _sfc_render$i;
_sfc_main$j.__scopeId = "data-v-776eddcc";
var fingerprinter_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$i = {
  props: {
    obj: Object
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
    },
    useBacktrace: {
      get() {
        return this.currentFingerprinter.BacktraceLines !== 0;
      },
      set(value) {
        this.currentFingerprinter.BacktraceLines = value ? -1 : 0;
      }
    },
    allLines: {
      get() {
        return this.currentFingerprinter.BacktraceLines < 1;
      },
      set(value) {
        this.currentFingerprinter.BacktraceLines = value ? -1 : 5;
      }
    },
    lines: {
      get() {
        let lines = this.currentFingerprinter.BacktraceLines;
        return lines < 1 ? 5 : lines;
      },
      set(lines) {
        this.currentFingerprinter.BacktraceLines = lines;
      }
    }
  }
};
const _withId$d = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-34e68d5c");
const _hoisted_1$f = { class: "form-check" };
const _hoisted_2$c = { class: "form-check-label" };
const _hoisted_3$c = /* @__PURE__ */ createVNode("span", null, "Custom Fingerprinter", -1);
const _hoisted_4$c = { class: "form-check" };
const _hoisted_5$b = { class: "form-check-label" };
const _hoisted_6$9 = /* @__PURE__ */ createVNode("span", null, "Error Class", -1);
const _hoisted_7$9 = { class: "form-check" };
const _hoisted_8$9 = { class: "form-check-label" };
const _hoisted_9$8 = /* @__PURE__ */ createVNode("span", null, "Message", -1);
const _hoisted_10$8 = { class: "form-check" };
const _hoisted_11$6 = { class: "form-check-label" };
const _hoisted_12$5 = /* @__PURE__ */ createVNode("span", null, "Component", -1);
const _hoisted_13$5 = { class: "form-check" };
const _hoisted_14$5 = { class: "form-check-label" };
const _hoisted_15$4 = /* @__PURE__ */ createVNode("span", null, "Action", -1);
const _hoisted_16$4 = { class: "form-check" };
const _hoisted_17$4 = { class: "form-check-label" };
const _hoisted_18$4 = /* @__PURE__ */ createVNode("span", null, "Environment Name", -1);
const _hoisted_19$3 = { class: "form-check" };
const _hoisted_20$3 = { class: "form-check-label" };
const _hoisted_21$2 = /* @__PURE__ */ createVNode("span", null, "Backtrace", -1);
const _hoisted_22$2 = { class: "form-check" };
const _hoisted_23$2 = { class: "form-check-label" };
const _hoisted_24$2 = /* @__PURE__ */ createVNode("span", null, "Every Line", -1);
const _hoisted_25$2 = { class: "form-check" };
const _hoisted_26$2 = { class: "form-check-label" };
const _hoisted_27$2 = /* @__PURE__ */ createVNode("span", null, "Only First", -1);
popScopeId();
const _sfc_render$h = /* @__PURE__ */ _withId$d((_ctx, _cache, $props, $setup, $data, $options) => {
  return openBlock(), createBlock(Fragment, null, [
    createVNode("fieldset", {
      disabled: !_ctx.currentUser.IsAdmin
    }, [
      createVNode("div", _hoisted_1$f, [
        createVNode("label", _hoisted_2$c, [
          withDirectives(createVNode("input", {
            class: "form-check-input",
            type: "checkbox",
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $options.customFingerprinter = $event)
          }, null, 512), [
            [vModelCheckbox, $options.customFingerprinter]
          ]),
          _hoisted_3$c
        ])
      ])
    ], 8, ["disabled"]),
    createVNode("fieldset", {
      disabled: !_ctx.currentUser.IsAdmin || !$options.customFingerprinter
    }, [
      createVNode("div", _hoisted_4$c, [
        createVNode("label", _hoisted_5$b, [
          withDirectives(createVNode("input", {
            class: "form-check-input",
            type: "checkbox",
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $options.currentFingerprinter.ErrorClass = $event)
          }, null, 512), [
            [vModelCheckbox, $options.currentFingerprinter.ErrorClass]
          ]),
          _hoisted_6$9
        ])
      ]),
      createVNode("div", _hoisted_7$9, [
        createVNode("label", _hoisted_8$9, [
          withDirectives(createVNode("input", {
            class: "form-check-input",
            type: "checkbox",
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $options.currentFingerprinter.Message = $event)
          }, null, 512), [
            [vModelCheckbox, $options.currentFingerprinter.Message]
          ]),
          _hoisted_9$8
        ])
      ]),
      createVNode("div", _hoisted_10$8, [
        createVNode("label", _hoisted_11$6, [
          withDirectives(createVNode("input", {
            class: "form-check-input",
            type: "checkbox",
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $options.currentFingerprinter.Component = $event)
          }, null, 512), [
            [vModelCheckbox, $options.currentFingerprinter.Component]
          ]),
          _hoisted_12$5
        ])
      ]),
      createVNode("div", _hoisted_13$5, [
        createVNode("label", _hoisted_14$5, [
          withDirectives(createVNode("input", {
            class: "form-check-input",
            type: "checkbox",
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $options.currentFingerprinter.Action = $event)
          }, null, 512), [
            [vModelCheckbox, $options.currentFingerprinter.Action]
          ]),
          _hoisted_15$4
        ])
      ]),
      createVNode("div", _hoisted_16$4, [
        createVNode("label", _hoisted_17$4, [
          withDirectives(createVNode("input", {
            class: "form-check-input",
            type: "checkbox",
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $options.currentFingerprinter.EnvironmentName = $event)
          }, null, 512), [
            [vModelCheckbox, $options.currentFingerprinter.EnvironmentName]
          ]),
          _hoisted_18$4
        ])
      ]),
      createVNode("div", _hoisted_19$3, [
        createVNode("label", _hoisted_20$3, [
          withDirectives(createVNode("input", {
            class: "form-check-input",
            type: "checkbox",
            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $options.useBacktrace = $event)
          }, null, 512), [
            [vModelCheckbox, $options.useBacktrace]
          ]),
          _hoisted_21$2
        ])
      ]),
      createVNode("fieldset", {
        class: "next",
        disabled: !$options.useBacktrace
      }, [
        createVNode("div", _hoisted_22$2, [
          createVNode("label", _hoisted_23$2, [
            withDirectives(createVNode("input", {
              class: "form-check-input",
              type: "radio",
              value: true,
              "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $options.allLines = $event)
            }, null, 512), [
              [vModelRadio, $options.allLines]
            ]),
            _hoisted_24$2
          ])
        ]),
        createVNode("div", _hoisted_25$2, [
          createVNode("label", _hoisted_26$2, [
            withDirectives(createVNode("input", {
              class: "form-check-input",
              type: "radio",
              value: false,
              "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $options.allLines = $event)
            }, null, 512), [
              [vModelRadio, $options.allLines]
            ]),
            _hoisted_27$2,
            withDirectives(createVNode("input", {
              class: "form-control form-control-sm lines mx-2",
              type: "number",
              min: "1",
              max: "99",
              step: "1",
              "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $options.lines = $event)
            }, null, 512), [
              [
                vModelText,
                $options.lines,
                void 0,
                { number: true }
              ]
            ]),
            createVNode("span", {
              textContent: toDisplayString($options.lines > 1 ? "Lines" : "Line")
            }, null, 8, ["textContent"])
          ])
        ])
      ], 8, ["disabled"])
    ], 8, ["disabled"])
  ], 64);
});
_sfc_main$i.render = _sfc_render$h;
_sfc_main$i.__scopeId = "data-v-34e68d5c";
var form_vue_vue_type_style_index_0_scoped_true_lang$1 = "";
const _sfc_main$h = {
  props: {
    obj: Object
  },
  components: {
    Fingerprinter: _sfc_main$i
  },
  data() {
    return {
      loading: false
    };
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
            if (!e || !e.toastShown) {
              this.$toast().error("Error updating app");
            }
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
        this.$toast().success("Successfully created app");
      }, (e) => {
        this.loading = false;
        if (!this.processErrors(e)) {
          if (!e || !e.toastShown) {
            this.$toast().error("Error creating app");
          }
        }
      });
    }
  }
};
const _withId$c = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-67431654");
const _hoisted_1$e = { class: "mb-3 row" };
const _hoisted_2$b = /* @__PURE__ */ createVNode("label", { class: "col-sm-2 col-form-label" }, "Name", -1);
const _hoisted_3$b = { class: "col-sm-8" };
const _hoisted_4$b = { class: "mb-3 row" };
const _hoisted_5$a = /* @__PURE__ */ createVNode("label", { class: "col-sm-2 col-form-label" }, "API Key", -1);
const _hoisted_6$8 = { class: "col-sm-8" };
const _hoisted_7$8 = { class: "col-sm-2" };
const _hoisted_8$8 = {
  key: 0,
  class: "form-control-plaintext"
};
const _hoisted_9$7 = { class: "mb-3 row" };
const _hoisted_10$7 = /* @__PURE__ */ createVNode("label", { class: "col-sm-2 col-form-label" }, "Fingerprinter", -1);
const _hoisted_11$5 = {
  key: 0,
  class: "col-sm-8"
};
const _hoisted_12$4 = { class: "form-control-plaintext" };
const _hoisted_13$4 = { class: "mb-3 row" };
const _hoisted_14$4 = { class: "col-sm-10 offset-sm-2" };
popScopeId();
const _sfc_render$g = /* @__PURE__ */ _withId$c((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_Fingerprinter = resolveComponent("Fingerprinter");
  return openBlock(), createBlock("form", {
    onSubmit: _cache[4] || (_cache[4] = withModifiers((...args) => $options.submit && $options.submit(...args), ["prevent"]))
  }, [
    createVNode("div", _hoisted_1$e, [
      _hoisted_2$b,
      createVNode("div", _hoisted_3$b, [
        withDirectives(createVNode("input", {
          type: "text",
          class: "form-control",
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $props.obj.Name = $event),
          ref: "Name",
          disabled: !_ctx.currentUser.IsAdmin
        }, null, 8, ["disabled"]), [
          [vModelText, $props.obj.Name]
        ])
      ])
    ]),
    createVNode("div", _hoisted_4$b, [
      _hoisted_5$a,
      createVNode("div", _hoisted_6$8, [
        withDirectives(createVNode("input", {
          type: "text",
          class: "form-control",
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $props.obj.ApiKey = $event),
          ref: "ApiKey",
          disabled: !_ctx.currentUser.IsAdmin
        }, null, 8, ["disabled"]), [
          [vModelText, $props.obj.ApiKey]
        ])
      ]),
      createVNode("div", _hoisted_7$8, [
        _ctx.currentUser.IsAdmin ? (openBlock(), createBlock("div", _hoisted_8$8, [
          createVNode("a", {
            href: "",
            onClick: _cache[3] || (_cache[3] = withModifiers((...args) => $options.generateApiKey && $options.generateApiKey(...args), ["prevent"]))
          }, "Regenerate")
        ])) : createCommentVNode("", true)
      ])
    ]),
    createVNode("div", _hoisted_9$7, [
      _hoisted_10$7,
      $props.obj.ActualFingerprinter ? (openBlock(), createBlock("div", _hoisted_11$5, [
        createVNode("div", _hoisted_12$4, [
          createVNode(_component_Fingerprinter, { obj: $props.obj }, null, 8, ["obj"])
        ])
      ])) : createCommentVNode("", true)
    ]),
    createVNode("div", _hoisted_13$4, [
      createVNode("div", _hoisted_14$4, [
        createVNode("button", {
          type: "submit",
          class: "btn btn-primary",
          disabled: !_ctx.currentUser.IsAdmin || $data.loading
        }, "Submit", 8, ["disabled"])
      ])
    ])
  ], 32);
});
_sfc_main$h.render = _sfc_render$g;
_sfc_main$h.__scopeId = "data-v-67431654";
var new_vue_vue_type_style_index_0_scoped_true_lang$1 = "";
const _sfc_main$g = {
  components: {
    Form: _sfc_main$h
  },
  data() {
    return {
      app: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    http.post(`/apps`).then((res) => {
      next((vm2) => {
        vm2.app = res.data.App;
        setTimeout(() => {
          vm2.$refs.form.generateApiKey();
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
const _withId$b = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-3fbf1a4a");
const _hoisted_1$d = /* @__PURE__ */ createVNode("div", { class: "mb-3 border-bottom" }, [
  /* @__PURE__ */ createVNode("h1", { class: "h3" }, "Add App")
], -1);
popScopeId();
const _sfc_render$f = /* @__PURE__ */ _withId$b((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_Form = resolveComponent("Form");
  return openBlock(), createBlock(Fragment, null, [
    _hoisted_1$d,
    createVNode(_component_Form, {
      class: "col-sm-8",
      obj: $data.app,
      ref: "form"
    }, null, 8, ["obj"])
  ], 64);
});
_sfc_main$g.render = _sfc_render$f;
_sfc_main$g.__scopeId = "data-v-3fbf1a4a";
const _sfc_main$f = {};
const _hoisted_1$c = { class: "nav nav-pills mb-3" };
const _hoisted_2$a = { class: "nav-item" };
const _hoisted_3$a = /* @__PURE__ */ createTextVNode("Edit App");
const _hoisted_4$a = { class: "nav-item" };
const _hoisted_5$9 = /* @__PURE__ */ createTextVNode("Notification Services");
function _sfc_render$e(_ctx, _cache) {
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createBlock("ul", _hoisted_1$c, [
    createVNode("li", _hoisted_2$a, [
      createVNode(_component_router_link, {
        class: "nav-link",
        "active-class": "active",
        to: { name: "RouteAppsEdit" }
      }, {
        default: withCtx(() => [
          _hoisted_3$a
        ]),
        _: 1
      })
    ]),
    createVNode("li", _hoisted_4$a, [
      createVNode(_component_router_link, {
        class: "nav-link",
        "active-class": "active",
        to: { name: "RouteAppsNotifications" }
      }, {
        default: withCtx(() => [
          _hoisted_5$9
        ]),
        _: 1
      })
    ])
  ]);
}
_sfc_main$f.render = _sfc_render$e;
var edit_vue_vue_type_style_index_0_scoped_true_lang$1 = "";
const _sfc_main$e = {
  components: {
    Nav: _sfc_main$f,
    Form: _sfc_main$h
  },
  data() {
    return {
      app: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    http.get(`/apps/${to.params.id}`).then((res) => {
      next((vm2) => {
        vm2.app = res.data.App;
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
const _withId$a = /* @__PURE__ */ withScopeId();
const _sfc_render$d = /* @__PURE__ */ _withId$a((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_Nav = resolveComponent("Nav");
  const _component_Form = resolveComponent("Form");
  return openBlock(), createBlock(Fragment, null, [
    createVNode(_component_Nav),
    createVNode(_component_Form, {
      class: "col-sm-8",
      obj: $data.app
    }, null, 8, ["obj"])
  ], 64);
});
_sfc_main$e.render = _sfc_render$d;
_sfc_main$e.__scopeId = "data-v-bc38fe34";
const _sfc_main$d = {
  props: {
    isEdit: Boolean,
    field: Object,
    options: Object
  },
  data() {
    return {
      editing: {}
    };
  },
  methods: {
    reset() {
      this.cancel();
    },
    edit() {
      let field = this.field.Name;
      this.editing[field] = { value: this.options[field] };
      this.options[field] = null;
      if (this.options.$$ignoredFields) {
        this.options.$$ignoredFields[field] = false;
      }
      setTimeout(() => {
        this.$refs[field].focus();
      });
    },
    cancel() {
      let field = this.field.Name;
      if (this.editing[field]) {
        this.options[field] = this.editing[field].value;
      }
      delete this.editing[field];
      if (this.options.$$ignoredFields) {
        this.options.$$ignoredFields[field] = true;
      }
    }
  }
};
const _hoisted_1$b = { class: "form-label" };
const _hoisted_2$9 = {
  key: 3,
  class: "form-control-plaintext"
};
const _hoisted_3$9 = {
  key: 0,
  class: "d-flex"
};
const _hoisted_4$9 = { class: "w-100" };
const _hoisted_5$8 = { class: "form-control-plaintext" };
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Fragment, null, [
    createVNode("label", _hoisted_1$b, [
      createVNode("span", {
        textContent: toDisplayString($props.field.Label)
      }, null, 8, ["textContent"]),
      $props.field.Hint ? (openBlock(), createBlock("span", {
        key: 0,
        class: "form-text ms-3",
        textContent: toDisplayString($props.field.Hint)
      }, null, 8, ["textContent"])) : createCommentVNode("", true)
    ]),
    $props.field.Type === "textarea" ? withDirectives((openBlock(), createBlock("textarea", {
      key: 0,
      class: "form-control",
      rows: "5",
      ref: $props.field.Name,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $props.options[$props.field.Name] = $event),
      placeholder: $props.field.Placeholder
    }, null, 8, ["placeholder"])), [
      [vModelText, $props.options[$props.field.Name]]
    ]) : $props.field.Type === "select" ? withDirectives((openBlock(), createBlock("select", {
      key: 1,
      class: "form-select",
      ref: $props.field.Name,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $props.options[$props.field.Name] = $event)
    }, [
      (openBlock(true), createBlock(Fragment, null, renderList($props.field.Options, (option) => {
        return openBlock(), createBlock("option", {
          value: option[0],
          textContent: toDisplayString(option[1])
        }, null, 8, ["value", "textContent"]);
      }), 256))
    ], 512)), [
      [vModelSelect, $props.options[$props.field.Name]]
    ]) : $props.field.Type === "number" ? withDirectives((openBlock(), createBlock("input", {
      key: 2,
      class: "form-control",
      autocomplete: "off",
      type: "number",
      ref: $props.field.Name,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $props.options[$props.field.Name] = $event),
      placeholder: $props.field.Placeholder
    }, null, 8, ["placeholder"])), [
      [
        vModelText,
        $props.options[$props.field.Name],
        void 0,
        { number: true }
      ]
    ]) : $props.isEdit && $props.field.Type === "password" ? (openBlock(), createBlock("div", _hoisted_2$9, [
      $data.editing[$props.field.Name] ? (openBlock(), createBlock("div", _hoisted_3$9, [
        createVNode("div", _hoisted_4$9, [
          withDirectives(createVNode("input", {
            class: "form-control",
            autocomplete: "off",
            type: "password",
            ref: $props.field.Name,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $props.options[$props.field.Name] = $event),
            placeholder: $props.field.Placeholder
          }, null, 8, ["placeholder"]), [
            [vModelText, $props.options[$props.field.Name]]
          ])
        ]),
        createVNode("div", null, [
          createVNode("div", _hoisted_5$8, [
            createVNode("a", {
              class: "ms-3 small text-danger",
              href: "",
              onClick: _cache[5] || (_cache[5] = withModifiers((...args) => $options.cancel && $options.cancel(...args), ["prevent"]))
            }, " cancel ")
          ])
        ])
      ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
        createVNode("span", {
          textContent: toDisplayString($props.options[$props.field.Name])
        }, null, 8, ["textContent"]),
        createVNode("a", {
          href: "",
          class: "ms-3 small",
          onClick: _cache[6] || (_cache[6] = withModifiers((...args) => $options.edit && $options.edit(...args), ["prevent"]))
        }, "edit")
      ], 64))
    ])) : withDirectives((openBlock(), createBlock("input", {
      key: 4,
      class: "form-control",
      autocomplete: "off",
      ref: $props.field.Name,
      type: $props.field.Type || "text",
      "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $props.options[$props.field.Name] = $event),
      placeholder: $props.field.Placeholder
    }, null, 8, ["type", "placeholder"])), [
      [vModelDynamic, $props.options[$props.field.Name]]
    ])
  ], 64);
}
_sfc_main$d.render = _sfc_render$c;
function makeMarkdownLinks(el) {
  let nodes = el.childNodes;
  let add = [];
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].nodeType !== Node.TEXT_NODE)
      continue;
    let parts = nodes[i].nodeValue.split(/\[([^\]]*)\]\(([^)]*)\)/);
    if (parts.length <= 1)
      continue;
    nodes[i].replaceWith(document.createTextNode(parts[0]));
    let next = nodes[i].nextSibling;
    for (let j = 1; j < parts.length; j++) {
      if (j % 3 === 0) {
        let textNode = document.createTextNode(parts[j]);
        add.push([textNode, next]);
      } else if (j % 3 === 1) {
        let a = document.createElement("a");
        a.setAttribute("href", parts[j + 1].trim());
        a.setAttribute("target", "_blank");
        a.innerHTML = parts[j].trim();
        add.push([a, next]);
      } else
        ;
    }
  }
  add.forEach((item) => {
    el.insertBefore(item[0], item[1]);
  });
}
const _sfc_main$c = {
  mounted(el, binding) {
    el.innerText = binding.value;
    setTimeout(() => {
      makeMarkdownLinks(el);
    });
  },
  updated(el, binding) {
    el.innerText = binding.value;
    setTimeout(() => {
      makeMarkdownLinks(el);
    });
  }
};
var notifications_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$b = {
  components: {
    Nav: _sfc_main$f,
    NotificationField: _sfc_main$d
  },
  directives: {
    SimpleHtml: _sfc_main$c
  },
  data() {
    return {
      loading: false,
      app: {},
      selectedService: null,
      selectedServiceOptions: {},
      services: [],
      availableServices: [],
      editingService: null,
      serviceEditing: null,
      relatedApps: [],
      selectedRelatedAppId: null
    };
  },
  watch: {
    selectedService(service) {
      for (let key in this.selectedServiceOptions) {
        delete this.selectedServiceOptions[key];
      }
      if (service) {
        service.Fields.forEach((f) => {
          this.selectedServiceOptions[f.Name] = f.DefaultValue;
        });
        this.getRelated(service.Name);
      } else {
        this.relatedApps = [];
        this.selectedRelatedAppId = null;
      }
    }
  },
  methods: {
    closeModals() {
      let m = Modal.getInstance(document.getElementById("add"));
      if (m)
        m.hide();
      m = Modal.getInstance(document.getElementById("edit"));
      if (m)
        m.hide();
    },
    getService(name2, field) {
      for (let i = 0; i < this.availableServices.length; i++) {
        if (this.availableServices[i].Name === name2) {
          if (field) {
            return this.availableServices[i][field];
          }
          return this.availableServices[i];
        }
      }
      return null;
    },
    optionValueOf(service, fieldName) {
      let fields = this.getService(service.Name, "Fields") || [];
      let field = fields.find((f) => f.Name === fieldName);
      if (field && field.Type === "select") {
        for (let i = 0; i < field.Options.length; i++) {
          if (field.Options[i][0] === service.Options[fieldName]) {
            return field.Options[i][1];
          }
        }
      }
      return service.Options[fieldName];
    },
    edit(service) {
      this.editingService = JSON.parse(JSON.stringify(service));
      this.serviceEditing = this.getService(this.editingService.Name);
      let ignored = {};
      let fields = this.serviceEditing.Fields;
      fields.forEach((f) => {
        if (f.Type === "password") {
          ignored[f.Name] = true;
        }
      });
      this.editingService.Options.$$ignoredFields = ignored;
      for (let key in this.$refs) {
        if (typeof this.$refs[key].reset === "function") {
          this.$refs[key].reset();
        }
      }
    },
    test(service) {
      this.loading = true;
      http.put(`/apps/${this.$route.params.id}/notification-services`, {
        Name: service.Name
      }).then((res) => {
        this.loading = false;
        this.$toast().success("Successfully ran test");
      }, (e) => {
        this.loading = false;
        if (e && e.response && e.response.data && e.response.data.Message) {
          this.$toast().error(e.response.data.Message);
        } else {
          this.$toast().error("Error testing service");
        }
      });
    },
    toggle(service) {
      this.loading = true;
      http.patch(`/apps/${this.$route.params.id}/notification-services`, {
        Name: service.Name
      }).then((res) => {
        this.loading = false;
        this.$toast().success("Successfully changed status");
        this.services = res.data.NotificatinonServices;
      }, (e) => {
        this.loading = false;
        this.$toast().error("Error changing status");
      });
    },
    add() {
      this.loading = true;
      this.processErrors();
      let promise;
      if (this.selectedRelatedAppId) {
        promise = http.post(`/apps/${this.$route.params.id}/notification-services/related`, {
          From: this.selectedRelatedAppId,
          Name: this.selectedService.Name
        });
      } else {
        promise = http.post(`/apps/${this.$route.params.id}/notification-services`, {
          Name: this.selectedService.Name,
          Options: this.selectedServiceOptions
        });
      }
      promise.then((res) => {
        this.loading = false;
        this.selectedService = null;
        this.$toast().success("Successfully added service");
        this.services = res.data.NotificatinonServices;
        this.closeModals();
      }, (e) => {
        this.loading = false;
        if (!this.processErrors(e)) {
          if (!e || !e.toastShown) {
            this.$toast().error("Error adding service");
          }
        }
      });
    },
    submit() {
      let options = JSON.parse(JSON.stringify(this.editingService.Options));
      let ignored = options.$$ignoredFields;
      for (let key in ignored) {
        if (ignored[key] === true)
          delete options[key];
      }
      delete options.$$ignoredFields;
      this.loading = true;
      this.processErrors();
      http.post(`/apps/${this.$route.params.id}/notification-services`, {
        Name: this.editingService.Name,
        Options: options
      }).then((res) => {
        this.loading = false;
        this.$toast().success("Successfully updated service");
        this.services = res.data.NotificatinonServices;
        this.closeModals();
      }, (e) => {
        this.loading = false;
        if (!this.processErrors(e)) {
          if (!e || !e.toastShown) {
            this.$toast().error("Error editing service");
          }
        }
      });
    },
    remove() {
      if (!window.confirm("Are you sure you want to remove this service from this app?"))
        return;
      this.loading = true;
      this.processErrors();
      http.delete(`/apps/${this.$route.params.id}/notification-services`, {
        data: {
          Name: this.editingService.Name
        }
      }).then((res) => {
        this.loading = false;
        this.$toast().success("Successfully removed service");
        this.services = res.data.NotificatinonServices;
        this.closeModals();
      }, (e) => {
        this.loading = false;
        this.$toast().error("Error removing service");
      });
    },
    getRelated(name2) {
      http.get("/notification-services/related", {
        params: {
          AppId: this.$route.params.id,
          Name: name2
        }
      }).then((res) => {
        this.relatedApps = res.data.Apps;
        this.selectedRelatedAppId = null;
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      http.get(`/apps/${to.params.id}`),
      http.get("/notification-services"),
      http.get(`/apps/${to.params.id}/notification-services`)
    ]).then((res) => {
      next((vm2) => {
        vm2.app = res[0].data.App;
        vm2.availableServices = res[1].data.NotificatinonServices;
        vm2.services = res[2].data.NotificatinonServices;
      });
    }, next);
  },
  beforeRouteUpdate(to, from, next) {
    Promise.all([
      http.get(`/apps/${to.params.id}`),
      http.get("/notification-services"),
      http.get(`/apps/${to.params.id}/notification-services`)
    ]).then((res) => {
      this.app = res[0].data.App;
      this.availableServices = res[1].data.NotificatinonServices;
      this.services = res[2].data.NotificatinonServices;
      next();
    }, next);
  },
  beforeRouteLeave(to, from, next) {
    this.closeModals();
    next();
  }
};
const _withId$9 = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-0f1f696f");
const _hoisted_1$a = /* @__PURE__ */ createVNode("div", { class: "mb-3" }, [
  /* @__PURE__ */ createVNode("button", {
    type: "button",
    class: "btn btn-secondary",
    "data-bs-toggle": "modal",
    "data-bs-target": "#add"
  }, "Add New Service...")
], -1);
const _hoisted_2$8 = { class: "row" };
const _hoisted_3$8 = { class: "card mb-3" };
const _hoisted_4$8 = { class: "card-header d-flex align-items-center justify-content-between" };
const _hoisted_5$7 = { class: "form-check-label" };
const _hoisted_6$7 = {
  key: 0,
  class: "small me-3 text-muted"
};
const _hoisted_7$7 = { class: "table small mb-0" };
const _hoisted_8$7 = { key: 0 };
const _hoisted_9$6 = /* @__PURE__ */ createVNode("input", {
  type: "text",
  class: "fake-input"
}, null, -1);
const _hoisted_10$6 = /* @__PURE__ */ createVNode("input", {
  type: "password",
  class: "fake-input"
}, null, -1);
const _hoisted_11$4 = { class: "modal-dialog" };
const _hoisted_12$3 = { class: "modal-content" };
const _hoisted_13$3 = /* @__PURE__ */ createVNode("div", { class: "modal-header" }, [
  /* @__PURE__ */ createVNode("h5", { class: "modal-title" }, "Add New Service"),
  /* @__PURE__ */ createVNode("button", {
    type: "button",
    class: "btn-close",
    "data-bs-dismiss": "modal",
    "aria-label": "Close"
  })
], -1);
const _hoisted_14$3 = { class: "modal-body" };
const _hoisted_15$3 = { class: "mb-2" };
const _hoisted_16$3 = /* @__PURE__ */ createVNode("label", { class: "form-label" }, "Service", -1);
const _hoisted_17$3 = /* @__PURE__ */ createVNode("option", { value: null }, "Select service...", -1);
const _hoisted_18$3 = {
  key: 0,
  class: "mt-2 text-muted"
};
const _hoisted_19$2 = {
  key: 0,
  class: "mb-2"
};
const _hoisted_20$2 = /* @__PURE__ */ createVNode("option", { value: null }, "Enter new", -1);
const _hoisted_21$1 = { key: 1 };
const _hoisted_22$1 = { class: "mb-2" };
const _hoisted_23$1 = { class: "modal-footer" };
const _hoisted_24$1 = /* @__PURE__ */ createVNode("input", {
  type: "text",
  class: "fake-input"
}, null, -1);
const _hoisted_25$1 = /* @__PURE__ */ createVNode("input", {
  type: "password",
  class: "fake-input"
}, null, -1);
const _hoisted_26$1 = { class: "modal-dialog" };
const _hoisted_27$1 = {
  key: 0,
  class: "modal-content"
};
const _hoisted_28$1 = { class: "modal-header" };
const _hoisted_29$1 = { class: "modal-title" };
const _hoisted_30 = /* @__PURE__ */ createTextVNode("Editing ");
const _hoisted_31 = /* @__PURE__ */ createVNode("button", {
  type: "button",
  class: "btn-close",
  "data-bs-dismiss": "modal",
  "aria-label": "Close"
}, null, -1);
const _hoisted_32$1 = { class: "modal-body" };
const _hoisted_33$1 = {
  key: 0,
  class: "mb-2 text-muted"
};
const _hoisted_34$1 = { class: "mb-3" };
const _hoisted_35$1 = { class: "modal-footer justify-content-between" };
popScopeId();
const _sfc_render$b = /* @__PURE__ */ _withId$9((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_Nav = resolveComponent("Nav");
  const _component_NotificationField = resolveComponent("NotificationField");
  const _directive_SimpleHtml = resolveDirective("SimpleHtml");
  return openBlock(), createBlock(Fragment, null, [
    createVNode(_component_Nav),
    _hoisted_1$a,
    createVNode("div", _hoisted_2$8, [
      (openBlock(true), createBlock(Fragment, null, renderList($data.services, (service) => {
        return openBlock(), createBlock("div", {
          class: ["col-sm-6", { disabled: !service.Enabled }]
        }, [
          createVNode("div", _hoisted_3$8, [
            createVNode("div", _hoisted_4$8, [
              createVNode("label", _hoisted_5$7, [
                createVNode("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  onClick: withModifiers(($event) => $options.toggle(service), ["prevent"]),
                  disabled: $data.loading,
                  checked: service.Enabled
                }, null, 8, ["onClick", "disabled", "checked"]),
                createVNode("h5", {
                  class: "ms-2 mb-0 d-inline",
                  textContent: toDisplayString(service.Name)
                }, null, 8, ["textContent"])
              ]),
              createVNode("div", null, [
                $data.loading ? (openBlock(), createBlock("span", _hoisted_6$7, "Test")) : (openBlock(), createBlock("a", {
                  key: 1,
                  href: "",
                  class: "small me-3",
                  onClick: withModifiers(($event) => $options.test(service), ["prevent"])
                }, "Test", 8, ["onClick"])),
                createVNode("a", {
                  href: "",
                  onClick: ($event) => $options.edit(service),
                  class: "small",
                  "data-bs-toggle": "modal",
                  "data-bs-target": "#edit"
                }, "Edit", 8, ["onClick"])
              ])
            ]),
            createVNode("table", _hoisted_7$7, [
              createVNode("tbody", null, [
                (openBlock(true), createBlock(Fragment, null, renderList($options.getService(service.Name, "Fields"), (field) => {
                  return openBlock(), createBlock(Fragment, null, [
                    $options.optionValueOf(service, field.Name) ? (openBlock(), createBlock("tr", _hoisted_8$7, [
                      createVNode("th", {
                        width: "30%",
                        textContent: toDisplayString(field.Label)
                      }, null, 8, ["textContent"]),
                      createVNode("td", {
                        class: "value",
                        textContent: toDisplayString($options.optionValueOf(service, field.Name))
                      }, null, 8, ["textContent"])
                    ])) : createCommentVNode("", true)
                  ], 64);
                }), 256))
              ])
            ])
          ])
        ], 2);
      }), 256))
    ]),
    createVNode("form", {
      onSubmit: _cache[3] || (_cache[3] = withModifiers((...args) => $options.add && $options.add(...args), ["prevent"])),
      class: "modal",
      id: "add",
      tabindex: "-1"
    }, [
      _hoisted_9$6,
      _hoisted_10$6,
      createVNode("div", _hoisted_11$4, [
        createVNode("div", _hoisted_12$3, [
          _hoisted_13$3,
          createVNode("div", _hoisted_14$3, [
            createVNode("div", _hoisted_15$3, [
              _hoisted_16$3,
              withDirectives(createVNode("select", {
                class: "form-select",
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.selectedService = $event)
              }, [
                _hoisted_17$3,
                (openBlock(true), createBlock(Fragment, null, renderList($data.availableServices, (service) => {
                  return openBlock(), createBlock("option", {
                    value: service,
                    textContent: toDisplayString(service.Name)
                  }, null, 8, ["value", "textContent"]);
                }), 256))
              ], 512), [
                [vModelSelect, $data.selectedService]
              ]),
              $data.selectedService && $data.selectedService.Description ? (openBlock(), createBlock("div", _hoisted_18$3, [
                withDirectives(createVNode("small", null, null, 512), [
                  [_directive_SimpleHtml, $data.selectedService.Description]
                ])
              ])) : createCommentVNode("", true)
            ]),
            $data.selectedService && $data.relatedApps.length ? (openBlock(), createBlock("div", _hoisted_19$2, [
              withDirectives(createVNode("select", {
                class: "form-select",
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.selectedRelatedAppId = $event)
              }, [
                _hoisted_20$2,
                (openBlock(true), createBlock(Fragment, null, renderList($data.relatedApps, (app2) => {
                  return openBlock(), createBlock("option", {
                    value: app2.Id,
                    textContent: toDisplayString(`Copy ${$data.selectedService.Name} settings from app ${app2.Name} (#${app2.Id})`)
                  }, null, 8, ["value", "textContent"]);
                }), 256))
              ], 512), [
                [vModelSelect, $data.selectedRelatedAppId]
              ])
            ])) : createCommentVNode("", true),
            $data.selectedService && $data.selectedRelatedAppId === null ? (openBlock(), createBlock("div", _hoisted_21$1, [
              (openBlock(true), createBlock(Fragment, null, renderList($data.selectedService.Fields, (field) => {
                return openBlock(), createBlock("div", _hoisted_22$1, [
                  createVNode(_component_NotificationField, {
                    field,
                    ref: field.Name,
                    options: $data.selectedServiceOptions
                  }, null, 8, ["field", "options"])
                ]);
              }), 256))
            ])) : createCommentVNode("", true)
          ]),
          createVNode("div", _hoisted_23$1, [
            createVNode("button", {
              type: "submit",
              class: "btn btn-primary",
              disabled: $data.loading
            }, "Save", 8, ["disabled"])
          ])
        ])
      ])
    ], 32),
    createVNode("form", {
      onSubmit: _cache[5] || (_cache[5] = withModifiers((...args) => $options.submit && $options.submit(...args), ["prevent"])),
      class: "modal",
      id: "edit",
      tabindex: "-1"
    }, [
      _hoisted_24$1,
      _hoisted_25$1,
      createVNode("div", _hoisted_26$1, [
        $data.editingService ? (openBlock(), createBlock("div", _hoisted_27$1, [
          createVNode("div", _hoisted_28$1, [
            createVNode("h5", _hoisted_29$1, [
              _hoisted_30,
              createVNode("span", {
                textContent: toDisplayString($data.editingService.Name)
              }, null, 8, ["textContent"])
            ]),
            _hoisted_31
          ]),
          createVNode("div", _hoisted_32$1, [
            $data.serviceEditing.Description ? (openBlock(), createBlock("div", _hoisted_33$1, [
              withDirectives(createVNode("small", null, null, 512), [
                [_directive_SimpleHtml, $data.serviceEditing.Description]
              ])
            ])) : createCommentVNode("", true),
            (openBlock(true), createBlock(Fragment, null, renderList($data.serviceEditing.Fields, (field) => {
              return openBlock(), createBlock("div", _hoisted_34$1, [
                createVNode(_component_NotificationField, {
                  isEdit: true,
                  field,
                  ref: field.Name,
                  options: $data.editingService.Options
                }, null, 8, ["field", "options"])
              ]);
            }), 256))
          ]),
          createVNode("div", _hoisted_35$1, [
            createVNode("button", {
              type: "button",
              class: "btn btn-danger",
              disabled: $data.loading,
              onClick: _cache[4] || (_cache[4] = withModifiers((...args) => $options.remove && $options.remove(...args), ["prevent"]))
            }, "Remove", 8, ["disabled"]),
            createVNode("button", {
              type: "submit",
              class: "btn btn-primary",
              disabled: $data.loading
            }, "Save", 8, ["disabled"])
          ])
        ])) : createCommentVNode("", true)
      ])
    ], 32)
  ], 64);
});
_sfc_main$b.render = _sfc_render$b;
_sfc_main$b.__scopeId = "data-v-0f1f696f";
var index_vue_vue_type_style_index_0_scoped_true_lang$2 = "";
const _sfc_main$a = {
  components: {
    Problems: _sfc_main$l,
    ProblemsHeader: _sfc_main$k
  },
  data() {
    return {
      response: {}
    };
  },
  methods: {
    load() {
      window.lastAppId = null;
    },
    reload() {
      http.get("/problems", { params: this.$route.query }).then((res) => {
        this.response = res.data;
        this.query = this.$route.query.query;
        this.load();
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    http.get("/problems", { params: to.query }).then((res) => {
      next((vm2) => {
        vm2.response = res.data;
        vm2.query = to.query.query;
        vm2.load();
      });
    }, next);
  },
  beforeRouteUpdate(to, from, next) {
    http.get("/problems", { params: to.query }).then((res) => {
      this.response = res.data;
      this.query = to.query.query;
      this.load();
      next();
    }, next);
  }
};
const _withId$8 = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-ca052610");
const _hoisted_1$9 = /* @__PURE__ */ createVNode("h5", { class: "mb-0 text-muted" }, "No errors have been caught yet", -1);
popScopeId();
const _sfc_render$a = /* @__PURE__ */ _withId$8((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_ProblemsHeader = resolveComponent("ProblemsHeader");
  const _component_Problems = resolveComponent("Problems");
  return openBlock(), createBlock(Fragment, null, [
    createVNode(_component_ProblemsHeader),
    createVNode(_component_Problems, {
      response: $data.response,
      showingResolved: _ctx.$route.query.status === "resolved",
      onReload: $options.reload
    }, {
      default: _withId$8(() => [
        _hoisted_1$9
      ]),
      _: 1
    }, 8, ["response", "showingResolved", "onReload"])
  ], 64);
});
_sfc_main$a.render = _sfc_render$a;
_sfc_main$a.__scopeId = "data-v-ca052610";
const _sfc_main$9 = {
  props: {
    loading: Boolean
  },
  emits: [
    "delete"
  ],
  mounted() {
    let button = this.$refs.button;
    let confirm = this.$refs.confirm;
    confirm.parentNode.removeChild(confirm);
    confirm.classList.remove("d-none");
    this.popover = new Popover(button, {
      html: true,
      trigger: "focus",
      content: confirm,
      container: button
    });
  },
  methods: {
    cancel() {
      this.popover.hide();
    },
    delete() {
      this.$emit("delete");
      this.popover.hide();
    }
  }
};
const _hoisted_1$8 = {
  type: "button",
  class: "btn btn-sm btn-danger",
  ref: "button"
};
const _hoisted_2$7 = {
  class: "d-none",
  ref: "confirm"
};
const _hoisted_3$7 = /* @__PURE__ */ createVNode("div", { class: "mb-2" }, "Permanently delete this comment?", -1);
const _hoisted_4$7 = { class: "d-flex justify-content-between" };
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_faicon = resolveComponent("faicon");
  return openBlock(), createBlock(Fragment, null, [
    createVNode("button", _hoisted_1$8, [
      createVNode(_component_faicon, { icon: "trash-alt" })
    ], 512),
    createVNode("div", _hoisted_2$7, [
      _hoisted_3$7,
      createVNode("div", _hoisted_4$7, [
        createVNode("a", {
          href: "",
          onClick: _cache[1] || (_cache[1] = withModifiers((...args) => $options.delete && $options.delete(...args), ["prevent"])),
          class: [{ disabled: $props.loading }, "btn btn-sm btn-danger"]
        }, "Delete", 2),
        createVNode("a", {
          href: "",
          onClick: _cache[2] || (_cache[2] = withModifiers((...args) => $options.cancel && $options.cancel(...args), ["prevent"])),
          class: [{ disabled: $props.loading }, "btn btn-sm btn-secondary"]
        }, "Cancel", 2)
      ])
    ], 512)
  ], 64);
}
_sfc_main$9.render = _sfc_render$9;
var comments_vue_vue_type_style_index_0_scoped_true_lang = "";
const observer = (() => {
  if (window.ResizeObserver) {
    return new window.ResizeObserver((entries) => {
      for (let entry of entries) {
        let truncated = entry.target.scrollHeight > entry.contentRect.height;
        entry.target.classList[truncated ? "add" : "remove"]("truncated");
      }
    });
  }
  return null;
})();
const _sfc_main$8 = {
  props: {
    commentsResponse: Object,
    appId: Number,
    problemId: Number
  },
  components: {
    CommentAction: _sfc_main$9,
    Pagination: _sfc_main$o
  },
  directives: {
    tooltip: {
      mounted(el) {
        new Tooltip(el, { animation: false });
      }
    },
    body: {
      mounted(el) {
        if (observer)
          observer.observe(el);
      }
    }
  },
  data() {
    return {
      loading: false,
      editingComment: null,
      listTransitionName: null,
      showMore: {},
      newCommentBody: null
    };
  },
  computed: {
    comments() {
      return this.commentsResponse.Comments || [];
    },
    pagination() {
      return this.commentsResponse.Pagination || {};
    },
    users() {
      return this.commentsResponse.Users || {};
    },
    commentBody: {
      get() {
        if (this.editingComment) {
          return this.editingComment.Body;
        }
        return this.newCommentBody;
      },
      set(val) {
        if (this.editingComment) {
          this.editingComment.Body = val;
          return;
        }
        this.newCommentBody = val;
      }
    }
  },
  methods: {
    timeago(time) {
      return format(time);
    },
    getUser(comment, key) {
      if (comment && comment.UserId) {
        let user2 = this.users.find((u) => u.Id === comment.UserId);
        if (user2 && key)
          return user2[key];
        return user2;
      }
      return null;
    },
    reload() {
      if (this.commentsResponse.$$reload) {
        this.loading = true;
        this.commentsResponse.$$reload().then((res) => {
          this.loading = false;
          for (let key in res.data) {
            this.commentsResponse[key] = res.data[key];
          }
        }, () => {
          this.loading = false;
        });
        return;
      }
      const current = this.$route;
      this.$router.replace({
        name: "RouteBlank"
      }).then(() => {
        this.$router.replace(current);
      });
    },
    isEdited(comment) {
      return new Date(comment.UpdatedAt) - new Date(comment.CreatedAt) > 1e3;
    },
    edit(comment) {
      this.editingComment = JSON.parse(JSON.stringify(comment));
      this.$refs.Body.focus();
    },
    keySubmit(e) {
      if (e.metaKey || e.ctrlKey) {
        this.submit();
      }
    },
    submit() {
      if (this.loading)
        return;
      this.loading = true;
      this.processErrors();
      let Body = this.commentBody;
      if (typeof Body === "string") {
        Body = Body.trim();
      }
      let method = null;
      let url = null;
      if (this.editingComment) {
        method = "put";
        url = `/apps/${this.appId}/problems/${this.problemId}/comments/${this.editingComment.Id}`;
      } else {
        method = "post";
        url = `/apps/${this.appId}/problems/${this.problemId}/comments`;
      }
      http[method](url, { Body }).then(() => {
        this.loading = false;
        this.$toast().success(this.editingComment ? "Successfully updated comment" : "Successfully added comment");
        this.editingComment = null;
        this.commentBody = null;
        this.reload();
      }, (e) => {
        this.loading = false;
        if (!this.processErrors(e)) {
          if (!e || !e.toastShown) {
            this.$toast().error(this.editingComment ? "Error updating comment" : "Error adding comment");
          }
        }
      });
    },
    toRemove(commentId) {
      this.listTransitionName = "destroy";
      let url = `/apps/${this.appId}/problems/${this.problemId}/comments/${commentId}`;
      this.loading = true;
      http.delete(url).then((res) => {
        this.loading = false;
        this.$toast().success("Successfully deleted comment");
        this.remove(commentId);
      }, (e) => {
        this.loading = false;
        if (!e || !e.toastShown) {
          this.$toast().error("Failed to delete comment");
        }
        this.remove();
      });
    },
    remove(id) {
      for (let i = this.comments.length - 1; i > -1; i--) {
        if (this.comments[i].Id === id) {
          this.comments.splice(i, 1);
          this.pagination.TotalCount -= 1;
        }
      }
      setTimeout(() => {
        this.listTransitionName = null;
      }, 400);
    }
  }
};
const _withId$7 = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-12cf1681");
const _hoisted_1$7 = /* @__PURE__ */ createVNode("a", {
  name: "comments",
  id: "comments",
  class: "anchor"
}, null, -1);
const _hoisted_2$6 = {
  key: 0,
  class: "text-muted"
};
const _hoisted_3$6 = { class: "d-flex w-100 align-items-start justify-content-between" };
const _hoisted_4$6 = { class: "d-sm-flex mb-2 align-items-center" };
const _hoisted_5$6 = {
  key: 0,
  class: "ms-2"
};
const _hoisted_6$6 = { class: "show-more" };
const _hoisted_7$6 = {
  key: 2,
  class: "mb-3"
};
const _hoisted_8$6 = {
  key: 3,
  class: "mb-3"
};
const _hoisted_9$5 = { class: "col-10 mb-3" };
const _hoisted_10$5 = { class: "d-flex align-items-center" };
popScopeId();
const _sfc_render$8 = /* @__PURE__ */ _withId$7((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_faicon = resolveComponent("faicon");
  const _component_CommentAction = resolveComponent("CommentAction");
  const _component_Pagination = resolveComponent("Pagination");
  const _directive_tooltip = resolveDirective("tooltip");
  const _directive_body = resolveDirective("body");
  return openBlock(), createBlock(Fragment, null, [
    _hoisted_1$7,
    createVNode("h5", {
      class: "mb-3",
      textContent: toDisplayString(`Comments (${$options.pagination.TotalCount || 0})`)
    }, null, 8, ["textContent"]),
    $options.pagination.TotalCount === 0 ? (openBlock(), createBlock("div", _hoisted_2$6, "No comments yet.")) : createCommentVNode("", true),
    createVNode(TransitionGroup, {
      name: $data.listTransitionName,
      tag: "div",
      class: "list-group mb-5"
    }, {
      default: _withId$7(() => [
        (openBlock(true), createBlock(Fragment, null, renderList($options.comments, (comment) => {
          return openBlock(), createBlock("div", {
            class: "list-group-item py-3",
            key: comment.Id
          }, [
            createVNode("div", _hoisted_3$6, [
              createVNode("div", {
                class: ["col-10", { more: $data.showMore[comment.Id] }]
              }, [
                createVNode("div", _hoisted_4$6, [
                  createVNode("strong", {
                    textContent: toDisplayString($options.getUser(comment, "Name"))
                  }, null, 8, ["textContent"]),
                  withDirectives(createVNode("small", {
                    class: "ms-3",
                    title: _ctx.formatTime(comment.CreatedAt),
                    textContent: toDisplayString($options.timeago(comment.CreatedAt))
                  }, null, 8, ["title", "textContent"]), [
                    [_directive_tooltip]
                  ]),
                  $options.isEdited(comment) ? withDirectives((openBlock(), createBlock("small", {
                    key: 0,
                    class: "ms-3 text-muted fst-italic",
                    title: _ctx.formatTime(comment.UpdatedAt)
                  }, "(edited)", 8, ["title"])), [
                    [_directive_tooltip]
                  ]) : createCommentVNode("", true),
                  comment.UserId === _ctx.currentUser.Id ? (openBlock(), createBlock("a", {
                    key: 1,
                    href: "",
                    class: "ms-auto small d-block",
                    onClick: withModifiers(($event) => $options.edit(comment), ["prevent"])
                  }, [
                    createVNode(_component_faicon, { icon: "edit" }),
                    $data.editingComment && $data.editingComment.Id === comment.Id ? (openBlock(), createBlock("span", _hoisted_5$6, "editing")) : createCommentVNode("", true)
                  ], 8, ["onClick"])) : createCommentVNode("", true)
                ]),
                withDirectives(createVNode("div", {
                  class: "small comment-body text-break",
                  textContent: toDisplayString(comment.Body)
                }, null, 8, ["textContent"]), [
                  [_directive_body]
                ]),
                createVNode("div", _hoisted_6$6, [
                  createVNode("a", {
                    href: "",
                    class: "small",
                    onClick: withModifiers(($event) => $data.showMore[comment.Id] = true, ["prevent"])
                  }, "show more", 8, ["onClick"])
                ])
              ], 2),
              createVNode(_component_CommentAction, {
                onDelete: ($event) => $options.toRemove(comment.Id),
                loading: $data.loading
              }, null, 8, ["onDelete", "loading"])
            ])
          ]);
        }), 128))
      ]),
      _: 1
    }, 8, ["name"]),
    $options.pagination.TotalPages > 1 ? (openBlock(), createBlock(_component_Pagination, {
      key: 1,
      hash: "#comments",
      pagination: $options.pagination
    }, null, 8, ["pagination"])) : createCommentVNode("", true),
    $data.editingComment ? (openBlock(), createBlock("h5", _hoisted_7$6, "Edit comment")) : (openBlock(), createBlock("h5", _hoisted_8$6, "Add a comment")),
    createVNode("form", {
      class: "mb-5",
      onSubmit: _cache[4] || (_cache[4] = withModifiers((...args) => $options.submit && $options.submit(...args), ["prevent"]))
    }, [
      createVNode("div", _hoisted_9$5, [
        withDirectives(createVNode("textarea", {
          class: "form-control",
          rows: "5",
          onKeydown: _cache[1] || (_cache[1] = withKeys((...args) => $options.keySubmit && $options.keySubmit(...args), ["enter"])),
          ref: "Body",
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $options.commentBody = $event)
        }, null, 544), [
          [vModelText, $options.commentBody]
        ])
      ]),
      createVNode("div", _hoisted_10$5, [
        createVNode("button", {
          type: "submit",
          disabled: $data.loading,
          class: "btn btn-primary"
        }, "Submit", 8, ["disabled"]),
        $data.editingComment ? (openBlock(), createBlock("a", {
          key: 0,
          class: "ms-4",
          href: "",
          onClick: _cache[3] || (_cache[3] = withModifiers(($event) => $data.editingComment = null, ["prevent"]))
        }, "Cancel")) : createCommentVNode("", true)
      ])
    ], 32)
  ], 64);
});
_sfc_main$8.render = _sfc_render$8;
_sfc_main$8.__scopeId = "data-v-12cf1681";
var show_vue_vue_type_style_index_0_scoped_true_lang = "";
function getCommnents(to) {
  return http.get(`/apps/${to.params.id}/problems/${to.params.pid}/comments`, {
    params: to.query
  }).then((res) => {
    res.data.$$reload = () => getCommnents(to);
    return res;
  });
}
function makeRequests(to) {
  return Promise.all([
    http.get(`/apps/${to.params.id}`),
    http.get(`/apps/${to.params.id}/problems/${to.params.pid}`),
    to.params.nid ? http.get(`/apps/${to.params.id}/problems/${to.params.pid}/notices/${to.params.nid}`) : Promise.resolve(),
    getCommnents(to)
  ]);
}
const _sfc_main$7 = {
  data() {
    return {
      app: {},
      problem: {},
      notice: {},
      commentsResponse: {},
      nav: null
    };
  },
  components: {
    Comments: _sfc_main$8
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
    load(route, noChange) {
      if (noChange !== true) {
        this.getNav();
      }
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
      }, (error) => {
        if (!error || !error.toastShown) {
          this.$toast().error("Error resolving issue");
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    makeRequests(to).then((res) => {
      const app2 = res[0].data.App;
      const problem = res[1].data.Problem;
      const commentsResponse = res[3].data;
      if (res[2]) {
        next((vm2) => {
          vm2.app = app2;
          vm2.problem = problem;
          vm2.notice = res[2].data.Notice;
          vm2.commentsResponse = commentsResponse;
          vm2.load(to);
        });
        return;
      }
      return http.get(`/apps/${to.params.id}/problems/${to.params.pid}/notices/${problem.LastNoticeId}`).then((res2) => {
        next((vm2) => {
          vm2.app = app2;
          vm2.problem = problem;
          vm2.notice = res2.data.Notice;
          vm2.commentsResponse = commentsResponse;
          vm2.load(to);
        });
      }, next);
    }, next);
  },
  beforeRouteUpdate(to, from, next) {
    function withoutPage(path) {
      return path.replace(/[?&]?page=\d+/, "");
    }
    if (withoutPage(to.fullPath) === withoutPage(from.fullPath)) {
      getCommnents(to).then((res) => {
        this.commentsResponse = res.data;
        this.load(to, true);
        next();
      }, next);
      return;
    }
    makeRequests(to).then((res) => {
      const app2 = res[0].data.App;
      const problem = res[1].data.Problem;
      const commentsResponse = res[3].data;
      if (res[2]) {
        this.app = app2;
        this.problem = problem;
        this.notice = res[2].data.Notice;
        this.commentsResponse = commentsResponse;
        this.load(to);
        next();
        return;
      }
      return http.get(`/apps/${to.params.id}/problems/${to.params.pid}/notices/${problem.LastNoticeId}`).then((res2) => {
        this.app = app2;
        this.problem = problem;
        this.notice = res2.data.Notice;
        this.commentsResponse = commentsResponse;
        this.load(to);
        next();
      }, next);
    }, next);
  }
};
const _withId$6 = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-0ad04a24");
const _hoisted_1$6 = { class: "p-3 bg-light border rounded-3 mb-4" };
const _hoisted_2$5 = { class: "d-sm-flex align-items-center justify-content-between" };
const _hoisted_3$5 = {
  key: 0,
  class: "mb-2 ms-3 text-success"
};
const _hoisted_4$5 = /* @__PURE__ */ createTextVNode(" Resolved");
const _hoisted_5$5 = /* @__PURE__ */ createTextVNode(" Resolve ");
const _hoisted_6$5 = { class: "small" };
const _hoisted_7$5 = /* @__PURE__ */ createVNode("strong", null, "App: ", -1);
const _hoisted_8$5 = /* @__PURE__ */ createVNode("strong", { class: "ms-2" }, "Where: ", -1);
const _hoisted_9$4 = { class: "small" };
const _hoisted_10$4 = /* @__PURE__ */ createVNode("strong", null, "Environment: ", -1);
const _hoisted_11$3 = /* @__PURE__ */ createVNode("strong", { class: "ms-2" }, "First Notice: ", -1);
const _hoisted_12$2 = /* @__PURE__ */ createVNode("strong", { class: "ms-2" }, "Last Notice: ", -1);
const _hoisted_13$2 = /* @__PURE__ */ createVNode("strong", { class: "ms-2" }, "Resolved At: ", -1);
const _hoisted_14$2 = { class: "d-sm-flex mb-4" };
const _hoisted_15$2 = {
  key: 0,
  class: "d-flex justify-content-between"
};
const _hoisted_16$2 = { class: "me-3" };
const _hoisted_17$2 = { key: 0 };
const _hoisted_18$2 = /* @__PURE__ */ createTextVNode("\u2190 Older");
const _hoisted_19$1 = { class: "me-3" };
const _hoisted_20$1 = { key: 0 };
const _hoisted_21 = /* @__PURE__ */ createTextVNode("Newer \u2192");
const _hoisted_22 = /* @__PURE__ */ createTextVNode(" viewing occurrence ");
const _hoisted_23 = /* @__PURE__ */ createTextVNode(" of ");
const _hoisted_24 = { class: "nav nav-pills mb-3" };
const _hoisted_25 = /* @__PURE__ */ createVNode("li", { class: "nav-item" }, [
  /* @__PURE__ */ createVNode("button", {
    class: "nav-link active",
    type: "button",
    "data-bs-toggle": "pill",
    "data-bs-target": "#page-summary"
  }, "Summary")
], -1);
const _hoisted_26 = /* @__PURE__ */ createVNode("li", { class: "nav-item" }, [
  /* @__PURE__ */ createVNode("button", {
    class: "nav-link",
    type: "button",
    "data-bs-toggle": "pill",
    "data-bs-target": "#page-backtrace"
  }, "Backtrace")
], -1);
const _hoisted_27 = {
  key: 0,
  class: "nav-item"
};
const _hoisted_28 = /* @__PURE__ */ createVNode("button", {
  class: "nav-link",
  type: "button",
  "data-bs-toggle": "pill",
  "data-bs-target": "#page-user"
}, "User", -1);
const _hoisted_29 = /* @__PURE__ */ createStaticVNode('<li class="nav-item" data-v-0ad04a24><button class="nav-link" type="button" data-bs-toggle="pill" data-bs-target="#page-environment" data-v-0ad04a24>Environment</button></li><li class="nav-item" data-v-0ad04a24><button class="nav-link" type="button" data-bs-toggle="pill" data-bs-target="#page-parameters" data-v-0ad04a24>Parameters</button></li><li class="nav-item" data-v-0ad04a24><button class="nav-link" type="button" data-bs-toggle="pill" data-bs-target="#page-session" data-v-0ad04a24>Session</button></li>', 3);
const _hoisted_32 = { class: "tab-content mb-5" };
const _hoisted_33 = {
  class: "tab-pane show active",
  id: "page-summary"
};
const _hoisted_34 = { class: "table-responsive" };
const _hoisted_35 = { class: "table table-bordered" };
const _hoisted_36 = /* @__PURE__ */ createVNode("td", {
  class: "fw-bold",
  width: "200"
}, "MESSAGE", -1);
const _hoisted_37 = { class: "small" };
const _hoisted_38 = /* @__PURE__ */ createVNode("td", { class: "fw-bold" }, "ERROR CLASS", -1);
const _hoisted_39 = /* @__PURE__ */ createVNode("td", { class: "fw-bold" }, "URL", -1);
const _hoisted_40 = /* @__PURE__ */ createVNode("td", { class: "fw-bold" }, "WHERE", -1);
const _hoisted_41 = /* @__PURE__ */ createVNode("td", { class: "fw-bold" }, "OCCURRED", -1);
const _hoisted_42 = /* @__PURE__ */ createVNode("td", { class: "fw-bold" }, "SIMILAR", -1);
const _hoisted_43 = /* @__PURE__ */ createVNode("td", { class: "fw-bold" }, "BROWSER", -1);
const _hoisted_44 = { class: "small" };
const _hoisted_45 = /* @__PURE__ */ createVNode("td", { class: "fw-bold" }, "ORIGIN", -1);
const _hoisted_46 = { class: "small" };
const _hoisted_47 = /* @__PURE__ */ createVNode("td", { class: "fw-bold" }, "APP SERVER", -1);
const _hoisted_48 = { key: 0 };
const _hoisted_49 = /* @__PURE__ */ createVNode("td", { class: "fw-bold" }, "APP VERSION", -1);
const _hoisted_50 = { key: 1 };
const _hoisted_51 = /* @__PURE__ */ createVNode("td", { class: "fw-bold" }, "FRAMEWORK", -1);
const _hoisted_52 = /* @__PURE__ */ createVNode("td", { class: "fw-bold" }, "REL. DIRECTORY", -1);
const _hoisted_53 = {
  class: "tab-pane",
  id: "page-backtrace"
};
const _hoisted_54 = { class: "p-3 bg-light border rounded-3 mb-4 small" };
const _hoisted_55 = { class: "text-nowrap" };
const _hoisted_56 = /* @__PURE__ */ createTextVNode(" \u2192 ");
const _hoisted_57 = {
  key: 0,
  class: "tab-pane",
  id: "page-user"
};
const _hoisted_58 = { class: "table-responsive" };
const _hoisted_59 = { class: "table table-bordered" };
const _hoisted_60 = {
  class: "tab-pane",
  id: "page-environment"
};
const _hoisted_61 = { class: "table-responsive" };
const _hoisted_62 = { class: "table table-bordered" };
const _hoisted_63 = {
  class: "tab-pane",
  id: "page-parameters"
};
const _hoisted_64 = {
  class: "tab-pane",
  id: "page-session"
};
popScopeId();
const _sfc_render$7 = /* @__PURE__ */ _withId$6((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_faicon = resolveComponent("faicon");
  const _component_router_link = resolveComponent("router-link");
  const _component_Comments = resolveComponent("Comments");
  return openBlock(), createBlock(Fragment, null, [
    createVNode("div", _hoisted_1$6, [
      createVNode("div", _hoisted_2$5, [
        createVNode("h4", {
          class: "mb-2",
          textContent: toDisplayString($data.problem.ErrorClass)
        }, null, 8, ["textContent"]),
        $data.problem.ResolvedAt ? (openBlock(), createBlock("div", _hoisted_3$5, [
          createVNode(_component_faicon, { icon: "check-circle" }),
          _hoisted_4$5
        ])) : (openBlock(), createBlock("button", {
          key: 1,
          class: "btn btn-sm btn-primary mb-2",
          onClick: _cache[1] || (_cache[1] = withModifiers((...args) => $options.resolve && $options.resolve(...args), ["prevent"]))
        }, [
          createVNode(_component_faicon, { icon: "thumbs-up" }),
          _hoisted_5$5
        ]))
      ]),
      createVNode("div", _hoisted_6$5, [
        _hoisted_7$5,
        createVNode(_component_router_link, {
          to: { name: "RouteAppsShow", params: { id: $data.app.Id } },
          textContent: toDisplayString($data.app.Name)
        }, null, 8, ["to", "textContent"]),
        _hoisted_8$5,
        createVNode("span", {
          textContent: toDisplayString($data.problem.Location)
        }, null, 8, ["textContent"])
      ]),
      createVNode("div", _hoisted_9$4, [
        _hoisted_10$4,
        createVNode("span", {
          textContent: toDisplayString($data.problem.Environment)
        }, null, 8, ["textContent"]),
        _hoisted_11$3,
        createVNode("span", {
          textContent: toDisplayString(_ctx.formatTime($data.problem.FirstNoticeAt))
        }, null, 8, ["textContent"]),
        _hoisted_12$2,
        createVNode("span", {
          textContent: toDisplayString(_ctx.formatTime($data.problem.LastNoticeAt))
        }, null, 8, ["textContent"]),
        $data.problem.ResolvedAt ? (openBlock(), createBlock(Fragment, { key: 0 }, [
          _hoisted_13$2,
          createVNode("span", {
            textContent: toDisplayString(_ctx.formatTime($data.problem.ResolvedAt))
          }, null, 8, ["textContent"])
        ], 64)) : createCommentVNode("", true)
      ])
    ]),
    createVNode("h3", {
      class: "text-break",
      textContent: toDisplayString($data.notice.Message)
    }, null, 8, ["textContent"]),
    createVNode("div", _hoisted_14$2, [
      $data.nav && !($data.nav.Older === null && $data.nav.Newer === null) ? (openBlock(), createBlock("div", _hoisted_15$2, [
        createVNode("div", _hoisted_16$2, [
          $data.nav.Older === null ? (openBlock(), createBlock("span", _hoisted_17$2, "\u2190 Older")) : (openBlock(), createBlock(_component_router_link, {
            key: 1,
            to: {
              name: "RouteNoticesShow",
              params: { id: $data.app.Id, pid: $data.problem.Id, nid: $data.nav.Older }
            }
          }, {
            default: _withId$6(() => [
              _hoisted_18$2
            ]),
            _: 1
          }, 8, ["to"]))
        ]),
        createVNode("div", _hoisted_19$1, [
          $data.nav.Newer === null ? (openBlock(), createBlock("span", _hoisted_20$1, "Newer \u2192")) : (openBlock(), createBlock(_component_router_link, {
            key: 1,
            to: {
              name: "RouteNoticesShow",
              params: { id: $data.app.Id, pid: $data.problem.Id, nid: $data.nav.Newer }
            }
          }, {
            default: _withId$6(() => [
              _hoisted_21
            ]),
            _: 1
          }, 8, ["to"]))
        ])
      ])) : createCommentVNode("", true),
      createVNode("div", null, [
        _hoisted_22,
        $data.nav && $data.nav.Number ? (openBlock(), createBlock("span", {
          key: 0,
          textContent: toDisplayString($data.nav.Number)
        }, null, 8, ["textContent"])) : createCommentVNode("", true),
        _hoisted_23,
        createVNode("span", {
          textContent: toDisplayString($data.problem.NoticesCount)
        }, null, 8, ["textContent"])
      ])
    ]),
    createVNode("ul", _hoisted_24, [
      _hoisted_25,
      _hoisted_26,
      $options.hasUserAttributes ? (openBlock(), createBlock("li", _hoisted_27, [
        _hoisted_28
      ])) : createCommentVNode("", true),
      _hoisted_29
    ]),
    createVNode("div", _hoisted_32, [
      createVNode("div", _hoisted_33, [
        createVNode("div", _hoisted_34, [
          createVNode("table", _hoisted_35, [
            createVNode("tbody", null, [
              createVNode("tr", null, [
                _hoisted_36,
                createVNode("td", null, [
                  createVNode("table", _hoisted_37, [
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList($data.problem.Messages, (item) => {
                        return openBlock(), createBlock("tr", null, [
                          createVNode("td", {
                            class: "pe-3",
                            textContent: toDisplayString(item.Percent)
                          }, null, 8, ["textContent"]),
                          createVNode("td", {
                            class: "fw-bold text-break",
                            textContent: toDisplayString(item.Value)
                          }, null, 8, ["textContent"])
                        ]);
                      }), 256))
                    ])
                  ])
                ])
              ]),
              createVNode("tr", null, [
                _hoisted_38,
                createVNode("td", {
                  textContent: toDisplayString($data.notice.ErrorClass)
                }, null, 8, ["textContent"])
              ]),
              createVNode("tr", null, [
                _hoisted_39,
                createVNode("td", {
                  textContent: toDisplayString($data.notice.Url)
                }, null, 8, ["textContent"])
              ]),
              createVNode("tr", null, [
                _hoisted_40,
                createVNode("td", {
                  textContent: toDisplayString($data.notice.Location)
                }, null, 8, ["textContent"])
              ]),
              createVNode("tr", null, [
                _hoisted_41,
                createVNode("td", {
                  textContent: toDisplayString(_ctx.formatTime($data.notice.CreatedAt))
                }, null, 8, ["textContent"])
              ]),
              createVNode("tr", null, [
                _hoisted_42,
                createVNode("td", {
                  textContent: toDisplayString($data.problem.NoticesCount - 1)
                }, null, 8, ["textContent"])
              ]),
              createVNode("tr", null, [
                _hoisted_43,
                createVNode("td", null, [
                  createVNode("table", _hoisted_44, [
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
                _hoisted_45,
                createVNode("td", null, [
                  createVNode("table", _hoisted_46, [
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
                _hoisted_47,
                createVNode("td", {
                  textContent: toDisplayString($data.notice.AppServer)
                }, null, 8, ["textContent"])
              ]),
              $data.notice.AppVersion ? (openBlock(), createBlock("tr", _hoisted_48, [
                _hoisted_49,
                createVNode("td", {
                  textContent: toDisplayString($data.notice.AppVersion)
                }, null, 8, ["textContent"])
              ])) : createCommentVNode("", true),
              $data.notice.Framework ? (openBlock(), createBlock("tr", _hoisted_50, [
                _hoisted_51,
                createVNode("td", {
                  textContent: toDisplayString($data.notice.Framework)
                }, null, 8, ["textContent"])
              ])) : createCommentVNode("", true),
              createVNode("tr", null, [
                _hoisted_52,
                createVNode("td", {
                  textContent: toDisplayString($data.notice.ProjectRoot)
                }, null, 8, ["textContent"])
              ])
            ])
          ])
        ])
      ]),
      createVNode("div", _hoisted_53, [
        createVNode("div", _hoisted_54, [
          (openBlock(true), createBlock(Fragment, null, renderList($data.notice.Backtraces, (b) => {
            return openBlock(), createBlock("div", _hoisted_55, [
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
              _hoisted_56,
              createVNode("span", {
                textContent: toDisplayString(b.Method)
              }, null, 8, ["textContent"])
            ]);
          }), 256))
        ])
      ]),
      $options.hasUserAttributes ? (openBlock(), createBlock("div", _hoisted_57, [
        createVNode("div", _hoisted_58, [
          createVNode("table", _hoisted_59, [
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
      createVNode("div", _hoisted_60, [
        createVNode("div", _hoisted_61, [
          createVNode("table", _hoisted_62, [
            createVNode("tbody", null, [
              (openBlock(true), createBlock(Fragment, null, renderList($data.notice.EnvVars, (value, key) => {
                return openBlock(), createBlock("tr", null, [
                  createVNode("th", {
                    class: "env-key",
                    textContent: toDisplayString(key)
                  }, null, 8, ["textContent"]),
                  createVNode("td", null, [
                    createVNode("div", {
                      textContent: toDisplayString(value),
                      class: "env-value text-break"
                    }, null, 8, ["textContent"])
                  ])
                ]);
              }), 256))
            ])
          ])
        ])
      ]),
      createVNode("div", _hoisted_63, [
        createVNode("pre", {
          class: "p-3 bg-light border rounded-3 mb-4",
          textContent: toDisplayString($data.notice.Params)
        }, null, 8, ["textContent"])
      ]),
      createVNode("div", _hoisted_64, [
        createVNode("pre", {
          class: "p-3 bg-light border rounded-3 mb-4",
          textContent: toDisplayString($data.notice.Session)
        }, null, 8, ["textContent"])
      ])
    ]),
    createVNode(_component_Comments, {
      commentsResponse: $data.commentsResponse,
      appId: $data.app.Id,
      problemId: $data.problem.Id
    }, null, 8, ["commentsResponse", "appId", "problemId"])
  ], 64);
});
_sfc_main$7.render = _sfc_render$7;
_sfc_main$7.__scopeId = "data-v-0ad04a24";
var index_vue_vue_type_style_index_0_scoped_true_lang$1 = "";
const _sfc_main$6 = {
  data() {
    return {
      users: [],
      pagination: {},
      query: null
    };
  },
  components: {
    Pagination: _sfc_main$o,
    SortButton: _sfc_main$n
  },
  computed: {
    isSearch() {
      return !!this.$route.query.query;
    }
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
  },
  beforeRouteEnter(to, from, next) {
    http.get("/users", { params: to.query }).then((res) => {
      next((vm2) => {
        vm2.users = res.data.Users;
        vm2.pagination = res.data.Pagination;
        vm2.query = to.query.query;
      });
    }, next);
  },
  beforeRouteUpdate(to, from, next) {
    http.get("/users", { params: to.query }).then((res) => {
      this.users = res.data.Users;
      this.pagination = res.data.Pagination;
      this.query = to.query.query;
      next();
    }, next);
  }
};
const _withId$5 = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-595676d5");
const _hoisted_1$5 = { class: "d-sm-flex align-items-center justify-content-between" };
const _hoisted_2$4 = { class: "mb-3" };
const _hoisted_3$4 = { class: "dropdown-menu" };
const _hoisted_4$4 = { key: 0 };
const _hoisted_5$4 = /* @__PURE__ */ createTextVNode("Active Users");
const _hoisted_6$4 = { key: 1 };
const _hoisted_7$4 = /* @__PURE__ */ createTextVNode("Deleted Users");
const _hoisted_8$4 = /* @__PURE__ */ createTextVNode("Add a New User");
const _hoisted_9$3 = { class: "input-group" };
const _hoisted_10$3 = /* @__PURE__ */ createVNode("button", {
  class: "btn btn-outline-secondary",
  type: "submit"
}, "Search", -1);
const _hoisted_11$2 = {
  key: 0,
  class: "mb-0 text-muted"
};
const _hoisted_12$1 = { class: "table-responsive" };
const _hoisted_13$1 = { class: "table" };
const _hoisted_14$1 = /* @__PURE__ */ createVNode("th", { width: "60" }, "#", -1);
const _hoisted_15$1 = /* @__PURE__ */ createTextVNode("NAME");
const _hoisted_16$1 = { width: "25%" };
const _hoisted_17$1 = /* @__PURE__ */ createTextVNode("CREATED AT");
const _hoisted_18$1 = { class: "clickable-row" };
const _hoisted_19 = {
  key: 0,
  class: "badge bg-primary me-2"
};
const _hoisted_20 = /* @__PURE__ */ createTextVNode(" Admin ");
popScopeId();
const _sfc_render$6 = /* @__PURE__ */ _withId$5((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_router_link = resolveComponent("router-link");
  const _component_SortButton = resolveComponent("SortButton");
  const _component_faicon = resolveComponent("faicon");
  const _component_Pagination = resolveComponent("Pagination");
  return openBlock(), createBlock(Fragment, null, [
    createVNode("div", _hoisted_1$5, [
      createVNode("div", _hoisted_2$4, [
        createVNode("button", {
          class: "btn btn-outline-secondary dropdown-toggle",
          type: "button",
          "data-bs-toggle": "dropdown",
          "aria-expanded": "false",
          textContent: toDisplayString(_ctx.$route.query.status === "deleted" ? "Deleted Users" : "Active Users")
        }, null, 8, ["textContent"]),
        createVNode("ul", _hoisted_3$4, [
          _ctx.$route.query.status === "deleted" ? (openBlock(), createBlock("li", _hoisted_4$4, [
            createVNode(_component_router_link, {
              class: "dropdown-item",
              to: { query: { query: _ctx.$route.query.query } }
            }, {
              default: _withId$5(() => [
                _hoisted_5$4
              ]),
              _: 1
            }, 8, ["to"])
          ])) : (openBlock(), createBlock("li", _hoisted_6$4, [
            createVNode(_component_router_link, {
              class: "dropdown-item",
              to: { query: { query: _ctx.$route.query.query, status: "deleted" } }
            }, {
              default: _withId$5(() => [
                _hoisted_7$4
              ]),
              _: 1
            }, 8, ["to"])
          ]))
        ]),
        _ctx.currentUser.IsAdmin ? (openBlock(), createBlock(_component_router_link, {
          key: 0,
          to: { name: "RouteUsersNew" },
          class: "ms-2 btn btn-primary"
        }, {
          default: _withId$5(() => [
            _hoisted_8$4
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ]),
      createVNode("form", {
        class: "mb-3",
        onSubmit: _cache[2] || (_cache[2] = withModifiers((...args) => $options.search && $options.search(...args), ["prevent"]))
      }, [
        createVNode("div", _hoisted_9$3, [
          withDirectives(createVNode("input", {
            type: "text",
            class: "form-control",
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.query = $event)
          }, null, 512), [
            [vModelText, $data.query]
          ]),
          _hoisted_10$3
        ])
      ], 32)
    ]),
    $data.pagination.TotalCount === 0 ? (openBlock(), createBlock("h5", _hoisted_11$2, "No users matched your query")) : (openBlock(), createBlock(Fragment, { key: 1 }, [
      createVNode("div", _hoisted_12$1, [
        createVNode("table", _hoisted_13$1, [
          createVNode("thead", null, [
            createVNode("tr", null, [
              _hoisted_14$1,
              createVNode("th", null, [
                createVNode(_component_SortButton, {
                  sort: "name",
                  defaultOrder: "asc",
                  pagination: $data.pagination
                }, {
                  default: _withId$5(() => [
                    _hoisted_15$1
                  ]),
                  _: 1
                }, 8, ["pagination"])
              ]),
              createVNode("th", _hoisted_16$1, [
                createVNode(_component_SortButton, {
                  sort: "created_at",
                  pagination: $data.pagination
                }, {
                  default: _withId$5(() => [
                    _hoisted_17$1
                  ]),
                  _: 1
                }, 8, ["pagination"])
              ])
            ])
          ]),
          createVNode("tbody", null, [
            (openBlock(true), createBlock(Fragment, null, renderList($data.users, (user2) => {
              return openBlock(), createBlock("tr", _hoisted_18$1, [
                createVNode("td", {
                  textContent: toDisplayString(user2.Id)
                }, null, 8, ["textContent"]),
                createVNode("td", null, [
                  user2.IsAdmin ? (openBlock(), createBlock("span", _hoisted_19, [
                    createVNode(_component_faicon, {
                      class: "small",
                      icon: "crown"
                    }),
                    _hoisted_20
                  ])) : createCommentVNode("", true),
                  createVNode(_component_router_link, {
                    to: { name: "RouteUsersEdit", params: { id: user2.Id } },
                    textContent: toDisplayString(user2.Name)
                  }, null, 8, ["to", "textContent"])
                ]),
                createVNode("td", {
                  textContent: toDisplayString(_ctx.formatTime(user2.CreatedAt))
                }, null, 8, ["textContent"])
              ]);
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
_sfc_main$6.render = _sfc_render$6;
_sfc_main$6.__scopeId = "data-v-595676d5";
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
    canEdit() {
      if (this.currentUser.IsAdmin)
        return true;
      if (this.obj.Id === this.currentUser.Id)
        return true;
      return false;
    }
  },
  methods: {
    submit() {
      this.loading = true;
      this.processErrors();
      if (this.obj.Id) {
        let url = `/users/${this.obj.Id}`;
        if (!this.currentUser.IsAdmin && this.obj.Id === this.currentUser.Id) {
          url = "/users/me";
        }
        http.put(url, this.obj).then((res) => {
          this.loading = false;
          for (let key in res.data.User) {
            this.obj[key] = res.data.User[key];
          }
          this.$router.push({
            name: "RouteUsers"
          });
          this.$toast().success("Successfully updated user");
        }, (e) => {
          this.loading = false;
          if (!this.processErrors(e)) {
            if (!e || !e.toastShown) {
              this.$toast().error("Error updating user");
            }
          }
        });
        return;
      }
      http.post(`/users`, this.obj).then((res) => {
        this.loading = false;
        this.$router.push({
          name: "RouteUsersEdit",
          params: {
            id: res.data.User.Id
          }
        });
        this.$toast().success("Successfully creating user");
      }, (e) => {
        this.loading = false;
        if (!this.processErrors(e)) {
          if (!e || !e.toastShown) {
            this.$toast().error("Error creating user");
          }
        }
      });
    }
  }
};
const _withId$4 = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-1e4e1652");
const _hoisted_1$4 = /* @__PURE__ */ createVNode("input", {
  type: "text",
  class: "fake-input"
}, null, -1);
const _hoisted_2$3 = /* @__PURE__ */ createVNode("input", {
  type: "password",
  class: "fake-input"
}, null, -1);
const _hoisted_3$3 = { class: "mb-3 row" };
const _hoisted_4$3 = /* @__PURE__ */ createVNode("label", { class: "col-sm-2 col-form-label" }, "Name", -1);
const _hoisted_5$3 = { class: "col-sm-8" };
const _hoisted_6$3 = { class: "mb-3 row" };
const _hoisted_7$3 = /* @__PURE__ */ createVNode("label", { class: "col-sm-2 col-form-label" }, "Password", -1);
const _hoisted_8$3 = { class: "col-sm-8" };
const _hoisted_9$2 = {
  key: 0,
  class: "text-muted mt-2"
};
const _hoisted_10$2 = /* @__PURE__ */ createVNode("small", null, "Leave blank to remain unchanged", -1);
const _hoisted_11$1 = { class: "mb-3 row" };
const _hoisted_12 = { class: "col-sm-8 offset-sm-2" };
const _hoisted_13 = { class: "form-control-plaintext" };
const _hoisted_14 = { class: "form-check" };
const _hoisted_15 = { class: "form-check-label" };
const _hoisted_16 = /* @__PURE__ */ createVNode("span", null, "Admin", -1);
const _hoisted_17 = { class: "mb-3 row" };
const _hoisted_18 = { class: "col-sm-10 offset-sm-2" };
popScopeId();
const _sfc_render$5 = /* @__PURE__ */ _withId$4((_ctx, _cache, $props, $setup, $data, $options) => {
  return openBlock(), createBlock("form", {
    onSubmit: _cache[4] || (_cache[4] = withModifiers((...args) => $options.submit && $options.submit(...args), ["prevent"]))
  }, [
    _hoisted_1$4,
    _hoisted_2$3,
    createVNode("div", _hoisted_3$3, [
      _hoisted_4$3,
      createVNode("div", _hoisted_5$3, [
        withDirectives(createVNode("input", {
          type: "text",
          class: "form-control",
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $props.obj.Name = $event),
          ref: "Name",
          disabled: !$options.canEdit
        }, null, 8, ["disabled"]), [
          [vModelText, $props.obj.Name]
        ])
      ])
    ]),
    createVNode("div", _hoisted_6$3, [
      _hoisted_7$3,
      createVNode("div", _hoisted_8$3, [
        withDirectives(createVNode("input", {
          type: "password",
          class: "form-control",
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $props.obj.Password = $event),
          ref: "Password",
          disabled: !$options.canEdit
        }, null, 8, ["disabled"]), [
          [vModelText, $props.obj.Password]
        ]),
        $props.obj.Id ? (openBlock(), createBlock("div", _hoisted_9$2, [
          _hoisted_10$2
        ])) : createCommentVNode("", true)
      ])
    ]),
    createVNode("div", _hoisted_11$1, [
      createVNode("div", _hoisted_12, [
        createVNode("div", _hoisted_13, [
          createVNode("div", _hoisted_14, [
            createVNode("label", _hoisted_15, [
              withDirectives(createVNode("input", {
                class: "form-check-input",
                type: "checkbox",
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $props.obj.IsAdmin = $event),
                disabled: !_ctx.currentUser.IsAdmin
              }, null, 8, ["disabled"]), [
                [vModelCheckbox, $props.obj.IsAdmin]
              ]),
              _hoisted_16
            ])
          ])
        ])
      ])
    ]),
    createVNode("div", _hoisted_17, [
      createVNode("div", _hoisted_18, [
        createVNode("button", {
          type: "submit",
          class: "btn btn-primary",
          disabled: !$options.canEdit || $data.loading
        }, "Submit", 8, ["disabled"])
      ])
    ])
  ], 32);
});
_sfc_main$5.render = _sfc_render$5;
_sfc_main$5.__scopeId = "data-v-1e4e1652";
var new_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$4 = {
  components: {
    Form: _sfc_main$5
  },
  data() {
    return {
      user: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    http.post(`/users`).then((res) => {
      next((vm2) => {
        vm2.user = res.data.User;
      });
    }, next);
  },
  beforeRouteUpdate(to, from, next) {
    http.post(`/users`).then((res) => {
      this.user = res.data.User;
      next();
    }, next);
  }
};
const _withId$3 = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-127dfabe");
const _hoisted_1$3 = /* @__PURE__ */ createVNode("div", { class: "mb-3 border-bottom" }, [
  /* @__PURE__ */ createVNode("h1", { class: "h3" }, "Add User")
], -1);
popScopeId();
const _sfc_render$4 = /* @__PURE__ */ _withId$3((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_Form = resolveComponent("Form");
  return openBlock(), createBlock(Fragment, null, [
    _hoisted_1$3,
    createVNode(_component_Form, {
      class: "col-sm-8",
      obj: $data.user,
      ref: "form"
    }, null, 8, ["obj"])
  ], 64);
});
_sfc_main$4.render = _sfc_render$4;
_sfc_main$4.__scopeId = "data-v-127dfabe";
var edit_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$3 = {
  components: {
    Form: _sfc_main$5
  },
  data() {
    return {
      user: {},
      loading: false
    };
  },
  methods: {
    restore() {
      if (!window.confirm("Are you sure you want to restore this user?"))
        return;
      this.loading = true;
      http.post(`/users/${this.user.Id}`).then((res) => {
        this.loading = false;
        this.$toast().success("Successfully restored user");
        for (let key in res.data.User) {
          this.user[key] = res.data.User[key];
        }
      }, (e) => {
        this.loading = false;
        if (!e || !e.toastShown) {
          this.$toast().error("Failed to restore user");
        }
      });
    },
    destroy() {
      if (!window.confirm("Are you sure you want to delete this user?"))
        return;
      this.loading = true;
      http.delete(`/users/${this.user.Id}`).then((res) => {
        this.loading = false;
        this.$toast().success("Successfully deleted user");
        for (let key in res.data.User) {
          this.user[key] = res.data.User[key];
        }
      }, (error) => {
        this.loading = false;
        if (!error || !error.toastShown) {
          this.$toast().error("Failed to delete user");
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    http.get(`/users/${to.params.id}`).then((res) => {
      next((vm2) => {
        vm2.user = res.data.User;
      });
    }, next);
  },
  beforeRouteUpdate(to, from, next) {
    http.get(`/users/${to.params.id}`).then((res) => {
      this.user = res.data.User;
      next();
    }, next);
  }
};
const _withId$2 = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-131d1084");
const _hoisted_1$2 = /* @__PURE__ */ createVNode("div", { class: "mb-3 border-bottom" }, [
  /* @__PURE__ */ createVNode("h1", { class: "h3" }, "Edit User")
], -1);
const _hoisted_2$2 = /* @__PURE__ */ createVNode("div", { class: "mb-3 border-bottom" }, [
  /* @__PURE__ */ createVNode("h1", { class: "h3" }, "Delete User")
], -1);
const _hoisted_3$2 = { class: "col-sm-8" };
const _hoisted_4$2 = { class: "mb-3 row" };
const _hoisted_5$2 = /* @__PURE__ */ createVNode("div", { class: "col-sm-2" }, " Sessions ", -1);
const _hoisted_6$2 = {
  key: 0,
  class: "mb-3 row"
};
const _hoisted_7$2 = /* @__PURE__ */ createVNode("div", { class: "col-sm-2" }, " Deleted At ", -1);
const _hoisted_8$2 = { class: "mb-3 row" };
const _hoisted_9$1 = { class: "col-sm-10 offset-sm-2" };
const _hoisted_10$1 = /* @__PURE__ */ createVNode("div", { class: "text-muted mt-2" }, [
  /* @__PURE__ */ createVNode("small", null, "Delete user will also delete all user's sessions")
], -1);
popScopeId();
const _sfc_render$3 = /* @__PURE__ */ _withId$2((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_Form = resolveComponent("Form");
  return openBlock(), createBlock(Fragment, null, [
    _hoisted_1$2,
    createVNode(_component_Form, {
      class: "col-sm-8 mb-5",
      obj: $data.user
    }, null, 8, ["obj"]),
    _hoisted_2$2,
    createVNode("div", _hoisted_3$2, [
      createVNode("div", _hoisted_4$2, [
        _hoisted_5$2,
        createVNode("div", {
          class: "col-sm-10",
          textContent: toDisplayString($data.user.SessionsCount)
        }, null, 8, ["textContent"])
      ]),
      $data.user.DeletedAt ? (openBlock(), createBlock("div", _hoisted_6$2, [
        _hoisted_7$2,
        createVNode("div", {
          class: "col-sm-10",
          textContent: toDisplayString(_ctx.formatTime($data.user.DeletedAt))
        }, null, 8, ["textContent"])
      ])) : createCommentVNode("", true),
      createVNode("div", _hoisted_8$2, [
        createVNode("div", _hoisted_9$1, [
          $data.user.DeletedAt ? (openBlock(), createBlock("button", {
            key: 0,
            type: "button",
            class: "btn btn-warning",
            onClick: _cache[1] || (_cache[1] = withModifiers((...args) => $options.restore && $options.restore(...args), ["prevent"])),
            disabled: !_ctx.currentUser.IsAdmin || $data.loading
          }, "Restore", 8, ["disabled"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
            createVNode("button", {
              type: "button",
              class: "btn btn-danger",
              onClick: _cache[2] || (_cache[2] = withModifiers((...args) => $options.destroy && $options.destroy(...args), ["prevent"])),
              disabled: !_ctx.currentUser.IsAdmin || $data.loading
            }, "Delete", 8, ["disabled"]),
            _hoisted_10$1
          ], 64))
        ])
      ])
    ])
  ], 64);
});
_sfc_main$3.render = _sfc_render$3;
_sfc_main$3.__scopeId = "data-v-131d1084";
var _imports_0 = "/android-chrome-512x512.png";
var signIn_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$2 = {
  data() {
    return {
      loading: false,
      name: null,
      password: null,
      rememberMe: false
    };
  },
  methods: {
    signIn() {
      this.loading = true;
      this.processErrors();
      http.post("/sign-in", {
        name: this.name,
        password: this.password
      }).then((res) => {
        this.loading = false;
        if (this.rememberMe) {
          if (window.localStorage)
            window.localStorage.setItem("token", res.data.Token);
          if (window.sessionStorage)
            window.sessionStorage.removeItem("token");
        } else {
          if (window.localStorage)
            window.localStorage.removeItem("token");
          if (window.sessionStorage)
            window.sessionStorage.setItem("token", res.data.Token);
        }
        let loc = this.$route.query.redirect || { name: "RouteHome" };
        this.$router.push(loc).then(() => {
          this.$toast().success("Successfully signed in");
        });
      }, (e) => {
        this.loading = false;
        if (!this.processErrors(e)) {
          if (!e || !e.toastShown) {
            this.$toast().error("Error signing in");
          }
        }
      });
    }
  }
};
const _withId$1 = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-2ae5d04a");
const _hoisted_1$1 = /* @__PURE__ */ createVNode("img", {
  class: "mb-4",
  src: _imports_0,
  alt: "errbit",
  width: "72",
  height: "72"
}, null, -1);
const _hoisted_2$1 = /* @__PURE__ */ createVNode("h1", { class: "h3 mb-3 fw-normal" }, "Please sign in", -1);
const _hoisted_3$1 = { class: "form-floating" };
const _hoisted_4$1 = /* @__PURE__ */ createVNode("label", null, "Name", -1);
const _hoisted_5$1 = { class: "form-floating mb-3" };
const _hoisted_6$1 = /* @__PURE__ */ createVNode("label", null, "Password", -1);
const _hoisted_7$1 = { class: "checkbox mb-3" };
const _hoisted_8$1 = /* @__PURE__ */ createTextVNode(" Remember me ");
popScopeId();
const _sfc_render$2 = /* @__PURE__ */ _withId$1((_ctx, _cache, $props, $setup, $data, $options) => {
  return openBlock(), createBlock("form", {
    onSubmit: _cache[4] || (_cache[4] = withModifiers((...args) => $options.signIn && $options.signIn(...args), ["prevent"]))
  }, [
    _hoisted_1$1,
    _hoisted_2$1,
    createVNode("div", _hoisted_3$1, [
      withDirectives(createVNode("input", {
        type: "text",
        class: "form-control",
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.name = $event),
        ref: "Name"
      }, null, 512), [
        [vModelText, $data.name]
      ]),
      _hoisted_4$1
    ]),
    createVNode("div", _hoisted_5$1, [
      withDirectives(createVNode("input", {
        type: "password",
        class: "form-control",
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.password = $event),
        ref: "Password"
      }, null, 512), [
        [vModelText, $data.password]
      ]),
      _hoisted_6$1
    ]),
    createVNode("div", _hoisted_7$1, [
      createVNode("label", null, [
        withDirectives(createVNode("input", {
          type: "checkbox",
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.rememberMe = $event)
        }, null, 512), [
          [vModelCheckbox, $data.rememberMe]
        ]),
        _hoisted_8$1
      ])
    ]),
    createVNode("button", {
      class: "w-100 btn btn-lg btn-primary mb-4",
      type: "submit",
      disabled: $data.loading
    }, "Sign in", 8, ["disabled"])
  ], 32);
});
_sfc_main$2.render = _sfc_render$2;
_sfc_main$2.__scopeId = "data-v-2ae5d04a";
var index_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$1 = {
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
const _sfc_render$1 = /* @__PURE__ */ _withId((_ctx, _cache, $props, $setup, $data, $options) => {
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
_sfc_main$1.render = _sfc_render$1;
_sfc_main$1.__scopeId = "data-v-369a4d5c";
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  return null;
}
_sfc_main.render = _sfc_render;
NProgress.configure({ showSpinner: false });
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  history: createWebHistory(),
  routes: [
    { path: "/", name: "RouteHome", component: _sfc_main$m, alias: ["/apps"] },
    { path: "/apps/new", name: "RouteAppsNew", component: _sfc_main$g },
    { path: "/apps/:id", name: "RouteAppsShow", component: _sfc_main$j },
    { path: "/apps/:id/edit", name: "RouteAppsEdit", component: _sfc_main$e },
    { path: "/apps/:id/notifications", name: "RouteAppsNotifications", component: _sfc_main$b },
    {
      path: "/apps/:id/problems/:pid/notices/:nid",
      name: "RouteNoticesShow",
      component: _sfc_main$7
    },
    {
      path: "/apps/:id/problems/:pid",
      name: "RouteProblemsShow",
      component: _sfc_main$7
    },
    { path: "/errors", name: "RouteProblems", component: _sfc_main$a },
    { path: "/users", name: "RouteUsers", component: _sfc_main$6 },
    { path: "/users/new", name: "RouteUsersNew", component: _sfc_main$4 },
    { path: "/users/:id/edit", name: "RouteUsersEdit", component: _sfc_main$3 },
    { path: "/sign-in", name: "RouteSignIn", component: _sfc_main$2, meta: { needCurrentUser: false } },
    { path: "/error", name: "RouteError", component: _sfc_main$1 },
    { path: "/\n", name: "RouteBlank", component: _sfc_main },
    { path: "/:pathMatch(.*)*", name: "RouteNotFound", component: _sfc_main$1 }
  ]
});
router.$lastRoute = null;
router.$lastError = null;
router.$vm = null;
router.setVM = (vm2) => {
  router.$vm = vm2;
};
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.name === "RouteError" || to.name === "RouteBlank")
    return next();
  router.$lastRoute = to;
  if (router.$vm) {
    router.$vm.getCurrentUser().then(() => {
      if (to.meta.needCurrentUser === false && router.$vm.currentUser.Id) {
        next({ name: "RouteHome" });
      } else {
        next();
      }
    }, next);
    return;
  }
  next();
});
router.afterEach((to) => {
  NProgress.done();
  setTimeout(() => {
    let title = router.$vm ? router.$vm.$t("titles.Default", null) : null;
    outer:
      for (let i = 0; i < to.matched.length; i++) {
        if (!to.name)
          break;
        let route = to.matched[i];
        for (let key in route.instances) {
          let vm2 = route.instances[key];
          if (!vm2)
            break;
          let t = vm2.$t(`titles.${to.name}`, null);
          if (t !== null) {
            if (typeof t === "function")
              t = t(vm2);
            title = t;
            break outer;
          }
        }
      }
    if (typeof title === "function")
      title = title(router.$vm);
    document.title = title;
  });
});
router.onError((err) => {
  let status = 0;
  if (err && err.response && err.response.status) {
    status = err.response.status;
  }
  if (status === 401) {
    let redirect = router.$lastRoute ? router.$lastRoute.fullPath : void 0;
    if (redirect === "/")
      redirect = void 0;
    router.push({ name: "RouteSignIn", query: { redirect } });
  } else {
    router.$lastError = err;
    router.push({ name: "RouteError" });
  }
});
const name = "Errbit";
const n = (...args) => [...args, name].join(" - ");
var titles = {
  Default: name,
  RouteHome: n("Apps"),
  RouteAppsNew: n("New App"),
  RouteAppsShow: (vm2) => n(vm2.app.Name, "Apps"),
  RouteAppsEdit: (vm2) => n(vm2.app.Name, "Edit App"),
  RouteAppsNotifications: (vm2) => n(vm2.app.Name, "Notification"),
  RouteProblems: n("Errors"),
  RouteProblemsShow: (vm2) => n(vm2.notice.Message),
  RouteUsers: n("Users"),
  RouteUsersNew: n("New User"),
  RouteUsersEdit: n("Edit User"),
  RouteSignIn: n("Sign In"),
  RouteError: n("Error"),
  RouteNotFound: n("Page Not Found")
};
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
  string_required: (p) => `must not be blank`,
  string_wrong: (p) => `wrong name or password`,
  string_deleted: (p) => `user has been deleted`,
  string_duplicate: (p) => `duplicate content`
};
var en_US = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  titles,
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
const currentUser = reactive({});
var user = {
  computed: {
    currentUser() {
      return currentUser;
    }
  },
  methods: {
    getCurrentUser() {
      return http.get("/users/me").then((res) => {
        for (let key in currentUser) {
          delete currentUser[key];
        }
        for (let key in res.data.User) {
          currentUser[key] = res.data.User[key];
        }
      }, () => {
        for (let key in currentUser) {
          delete currentUser[key];
        }
      });
    }
  }
};
function pad0(n2) {
  return n2 < 10 ? "0" + n2 : n2;
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
      let refs = {};
      for (let key in this.$refs) {
        refs[key] = this.$refs[key];
        if (refs[key] && refs[key].$refs) {
          for (let k in refs[key].$refs) {
            refs[k] = refs[key].$refs[k];
          }
        }
      }
      for (let key in refs) {
        let elem = refs[key];
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
        let elem = refs[key] || refs["input-" + key];
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
library.add(faThumbsUp, faCheckCircle, faCheck, faTimes, faCrown, faCaretUp, faCaretDown, faTrashAlt, faEdit);
const app = createApp(_sfc_main$p);
app.use(router);
app.use(VueToastificationPlugin).mixin({ methods: { $toast: useToast } });
app.mixin(i18n);
app.mixin(user);
app.mixin(utils);
app.component("faicon", FontAwesomeIcon);
const vm = app.mount("body");
router.setVM(vm);

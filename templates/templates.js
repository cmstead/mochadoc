var Handlebars = require("handlebars/runtime");  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['core'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<html>\r\n\r\n<head>\r\n    <title>"
    + alias4(((helper = (helper = helpers.projectName || (depth0 != null ? depth0.projectName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"projectName","hash":{},"data":data}) : helper)))
    + " -- Mochadoc Test Documentation</title>\r\n\r\n    <link rel=\"stylesheet\" href=\""
    + alias4(((helper = (helper = helpers.fileRoot || (depth0 != null ? depth0.fileRoot : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fileRoot","hash":{},"data":data}) : helper)))
    + "assets/doc-style.css\" media=\"screen\">\r\n    <link rel=\"stylesheet\" href=\""
    + alias4(((helper = (helper = helpers.fileRoot || (depth0 != null ? depth0.fileRoot : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fileRoot","hash":{},"data":data}) : helper)))
    + "assets/github-gist.css\" media=\"screen\">\r\n</head>\r\n\r\n<body>\r\n    <header>\r\n        <a href=\""
    + alias4(((helper = (helper = helpers.fileRoot || (depth0 != null ? depth0.fileRoot : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fileRoot","hash":{},"data":data}) : helper)))
    + "index.html\"><span id=\"library-name\">"
    + alias4(((helper = (helper = helpers.projectName || (depth0 != null ? depth0.projectName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"projectName","hash":{},"data":data}) : helper)))
    + "</span>\r\n        <span id=\"subtitle\">Mochadoc-Generated Test Documents</span></a>\r\n    </header>\r\n\r\n    <div class=\"content\">\r\n        "
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n    </div>\r\n\r\n    <script src=\""
    + alias4(((helper = (helper = helpers.fileRoot || (depth0 != null ? depth0.fileRoot : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fileRoot","hash":{},"data":data}) : helper)))
    + "assets/code-collapse.js\"></script>\r\n    <script src=\""
    + alias4(((helper = (helper = helpers.fileRoot || (depth0 != null ? depth0.fileRoot : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fileRoot","hash":{},"data":data}) : helper)))
    + "assets/highlight.pack.js\"></script>\r\n    <script>hljs.initHighlightingOnLoad();</script>\r\n</body>\r\n\r\n</html>";
},"useData":true});
templates['describeItem'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<li class=\"describe-item\">\r\n    <h3>"
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</h3>\r\n    <div><a href=\"#\" class=\"describe-link\"></a></div>\r\n    <ul class=\"describe-collapsible shown\">\r\n        "
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n    </ul>\r\n</li>";
},"useData":true});
templates['describeLink'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<li>\r\n    <h3><a href=\"./details/"
    + ((stack1 = ((helper = (helper = helpers.fileName || (depth0 != null ? depth0.fileName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fileName","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\">"
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</a></h3>\r\n</li>";
},"useData":true});
templates['describePage'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<h1>"
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</h1>\r\n<div>\r\n    <a href=\"#\" class=\"collapse-all\">Collapse All</a>\r\n</div>\r\n<ul>\r\n    "
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n</ul>";
},"useData":true});
templates['testItem'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<ul>\r\n    <li>\r\n        <strong>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</strong>\r\n    </li>\r\n    <li>File location: <span class=\"filename\">"
    + alias4(((helper = (helper = helpers.file || (depth0 != null ? depth0.file : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"file","hash":{},"data":data}) : helper)))
    + "</span></li>\r\n    <li class=\"code-sample-wrapper\">\r\n        <div class=\"code-expand\">\r\n            <a href=\"#\"></a>\r\n        </div>\r\n        <pre class=\"code-sample\">\r\n            <code>\r\n        "
    + alias4(((helper = (helper = helpers.testBody || (depth0 != null ? depth0.testBody : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"testBody","hash":{},"data":data}) : helper)))
    + "\r\n            </code>\r\n        </pre>\r\n    </li>\r\n</ul>";
},"useData":true});

$.widget("custom.SuperGrid",{_create:function(){$.each(this.options.columns,function(t,e){e.width||(e.width=26)}),this._renderGrid(),this._bindListeners()},_bindListeners:function(){var t=this;this.element.off("click",'.supergrid_header td[data-sortable="true"]'),this.element.on("click",'.supergrid_header td[data-sortable="true"]',function(e){var i=$(this),r=i.attr("data-sort"),a=i.attr("data-id"),d=t.options.columns,s;switch(t.element.find(".supergrid_header td").removeAttr("data-sort"),r){case"asc":s="desc";break;case"desc":default:s="asc"}$.each(d,function(t,e){return e.id===a?(e.sort=s,!0):void delete e.sort}),i.attr("data-sort",s),t._trigger("-sorted",e,{columns:t.options.columns}),t._renderGrid()})},_renderGrid:function(){this._sortData(),this.element.html(this._buildGrid()),this._addMetaData(),this._trigger("-rendered")},_addMetaData:function(){var t=this;$.each(this.options.data,function(e,i){t.element.find('tr[data-id="'+i.id+'"]').data(i)})},_sortData:function(){var t=this._getSorting(),e,i,r,a;return $.isEmptyObject(t)?!1:(e="asc"===t.sort,a=t.field,$.each(this.options.columns,function(t,e){return e.id===a?(i=e.getSortValue,r=e.sortFunc,!1):void 0}),void this.options.data.sort(function(t,d){return r?r(t,d,e):(t[a]=i?i(t):t[a],d[a]=i?i(d):d[a],t[a]<d[a]?e?-1:1:t[a]>d[a]?e?1:-1:0)}))},_getSorting:function(){var t={};return $.each(this.options.columns,function(e,i){return i.sort?(t.field=i.id,t.sort=i.sort,!1):void 0}),t},_buildGrid:function(){var t=this._buildHeader(),e=this._buildBody(),i='<table class="supergrid" style="width:100%;table-layout: fixed;">';return i+=t,i+="<tbody>",i+=e,i+="</tbody>",i+="</table>"},_buildHeader:function(){var t='<thead class="supergrid_header">';return t+="<tr>",$.each(this.options.columns,function(e,i){var r=i.cellClass||"",a=i.width||"",d=i.id||"",s=i.name||"",n=i.sort||"",o=i.sortable||"";t+='<td style="width:'+i.width+'px;" scope="col" class="'+r+'" data-id="'+d+'" tabIndex="0"',n&&(t+='data-sort="'+n+'" '),t+='data-sortable="'+o+'">',t+="<div>",t+=s,n&&(t+='<div class="sort-icon"></div>'),t+="</div>",t+="</td>"}),t+="</tr>",t+="</thead>"},_buildBody:function(){var t=this.options.data,e=this.options.columns,i=this,r="";return $.each(t,function(t,a){var d=a.id||"";r+='<tr class="section" data-id="'+d+'">',$.each(e,function(t,e){var d=e.cellClass||"";r+='<td class="'+d+'" tabIndex="0">',r+="<div>",r+=i._buildCell(a,e),r+="</div>",r+="</td>"}),r+="</tr>"}),r},_buildCell:function(t,e){var i=[],r=/\#(.*?)\#/,a=e.formatter,d=a,s=r.exec(a);if(!t)return"";if("function"==typeof a)return a(t);if("object"==typeof a&&(a=e.formatter),d=a,s=r.exec(a),d){for(;s;)i.push(s[0]),d=d.replace(s[0],""),s=r.exec(d);return $.each(i,function(e,i){var r=i.replace(/#|_/g,"");a=a.replace(i,t[r])}),a}return t[e.id]},updateGrid:function(t,e){t&&(this.options.data=$.extend([],t)),e&&(this.options.columns=$.extend([],e)),this.element.empty(),this._renderGrid()}});
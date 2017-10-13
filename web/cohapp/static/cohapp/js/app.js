var app=app||{};app.urls=function(){this.url=window.location.href;this.url.split("/");return this.url=window.location.href,this.split=this.url.split("/"),this.website=this.split[0]+"//"+this.split[2],this.dashboard=this.website+"/dashboard/",this.experiments=this.website+"/apis/experiments/",this.measurement=this.website+"/apis/measurements/",this.experiment=this.website+"/apis/experiment/",this.user_specific=this.website+"/apis/user-specific/",this.user_experiment=this.website+"/apis/user-experiment",this.user_specific_name=this.website+"/apis/user-specific-name/",this.user=this.website+"/apis/user-experiment/",this.registration=this.website+"/apis/registration/",this.groups=this.website+"/apis/groups/",this.textanalyzer=this.website+"/apis/textanalyzer/",this.textdata=this.website+"/apis/textdata/",this.csv_text_data=this.website+"/csv_text_export/",this.single_experiment=this.website+"/experiment/",this.run_experiment=this.website+"/run-experiment/",this}(),app.constants=function(){return this.editor_textinput=["<p>Der Editor zur Analyse der Kohärenz von Texten.</p>","<p>Schreibe hier deinen Text, klicke auf <em>Analyziere Text</em> und lass dir anzeigen, wie kohärent dein Text ist.</p>"],this.toast_textinput=["Dein Text konnte nicht verarbeitet werden!                              Schaue, ob du mindestens zwei Sätze geschrieben hast."],this.simpleRevisionModal="Sie haben nun die Gelegenheit Ihren Text zu überarbeiten.                                 Versuchen Sie potentielle Kohärenzbrüche in Ihrem Text zu                                 schließen und Bezüge zwischen den Konzepten klar darzustellen.                                 Integrieren Sie in Ihrer Überarbeitung auch Konzepte und Verbindungen                                 zwischen Konzepten, die Sie eventuell in Ihrem Entwurf noch nicht                                 bedacht haben.",this}(),app.getExperimentId=function(){var e=window.location.href,t=e.substr(e.lastIndexOf("/")+1);return t},app.regExText=function(e){var t=$("#editor-textinput").html();t=t.replace(/[Cc]ognitive [Ll]oad [Tt]heor(y|(ie))/g,"Cognitive-Load-Theory"),t=t.replace(/[Ee]xtrinsischer? [Bb]elastung/g,"Extrinsische-Belastung"),t=t.replace(/[Ii]ntrinsischer? [Bb]elastung/g,"Intrinsische-Belastung"),t=t.replace(/[Ll]ernbezogener? [Bb]elastung/g,"Lernbezogene-Belastung"),t=t.replace(/[Ee]xtrinsic [Ll]oad/,"Extrinsic-Load"),t=t.replace(/[Ii]ntrinsic [Ll]oad/g,"Intrinsic-Load"),t=t.replace(/[Gg]ermane [Ll]oad/g,"Germane-Load"),t=t.replace(/bzw.?/g,"beziehungsweise"),$(e).html(t)},app.getDifference=function(e,t){for(var n=0,r=0,i="";r<t.length;)e[n]!=t[r]||n==e.length?i+=t[r]:n++,r++;return i.length},app.getParagraphs=function(e){var t=e.find("p"),n="";return t.each(function(e){var r=t[e].innerText.replace(/([A-z0-9'<>\u00dc\u00fc\u00e4\u00c4\u00f6\u00d6\u00df\-\/]+)/g,"<span>$1</span>"),i=$(r);n+=t[e].innerText+" ",$(this).html(i),$(this).append(".")}),n.replace(/(\r\n|\n|\r)/gm,""),n.replace(/\s\s+/g,""),n.trim()},app.getPlainText=function(e){var t=e.find("p"),n="";return t.each(function(e){n+=t[e].innerText+"|LINE-BREAK|"}),n},app.escapeRegExp=function(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")},app.replaceAll=function(e,t,n){return e.replace(new RegExp(t,"g"),n)},app.getCookie=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),r=0;r<n.length;r++){var i=jQuery.trim(n[r]);if(i.substring(0,e.length+1)==e+"="){t=decodeURIComponent(i.substring(e.length+1));break}}return t},app.csrfSafeMethod=function(e){return/^(GET|HEAD|OPTIONS|TRACE)$/.test(e)},app.sameOrigin=function(e){var t=document.location.host,n=document.location.protocol,r="//"+t,i=n+r;return e==i||e.slice(0,i.length+1)==i+"/"||e==r||e.slice(0,r.length+1)==r+"/"||!/^(\/\/|http:|https:).*/.test(e)},app.highlightWholeText=function(e,t,n){for(var r=[],i=0;i<t.length;i++)r[i]=[].concat.apply([],Object.keys(t[i]).map(function(e){return[t[i][e].source.word,t[i][e].target.word]}));$(e).find("p").each(function(e){var t=$(this).text();$(this).html(app.colorText(t,this,r,n))})},app.colorText=function(e,t,n,r){for(var i=e,a=(e.replace(/[.,\/#!$%\^&\*;:{}=_`~()]/g,"").split(" "),i.replace(/[^\wöäüÄÖÜß-\s]|_/g,function(e){return" "+e+" "}).replace(/[ ]+/g," ").split(" ")),s=0;s<a.length;s++)for(var o=a[s],l=0;l<n.length;l++)$.inArray(o,n[l])!=-1&&(a[s]=o.replace(o,'<a style="color: '+r(l)+';font-weight: bold" class="cluster'+l+'">'+o+"</a>"));return a.join(" ")},app.highlightSelectedWord=function(e,t,n,r,i){$(e).find("p").each(function(e){var a=$(this).text(),s=a.replace(/([A-z0-9'<>\u00dc\u00fc\u00e4\u00c4\u00f6\u00d6\u00df\-\/]+)/g,"<span>$1</span>"),o=$(s);s=o.map(function(e){if("SPAN"==o[e].tagName){var a=o[e];if(t==a.innerHTML||n[t].indexOf(a.innerHTML)>-1)return a.style.color=r(i[t]),a.className+="highlight-related",a}return e}),$(this).html(o),$(this).append(".")})};var app=app||{};app.TextAnalyzerModel=Backbone.Model.extend({url:app.urls.textanalyzer});var app=app||{};app.ExperimentModel=Backbone.Model.extend({defaults:{name:"",nr_measurements:"",nr_groups:""},url:app.urls.experiment+app.getExperimentId()});var app=app||{};app.UserModel=Backbone.Model.extend({url:app.urls.user_experiment+app.getExperimentId()});var app=app||{};app.UserSpecificModel=Backbone.Model.extend({url:app.urls.user_specific+app.getExperimentId()});var app=app||{};app.GroupsModel=Backbone.Model.extend({url:app.urls.groups});var app=app||{};app.MeasurementModel=Backbone.Model.extend({url:app.urls.measurement});var app=app||{};app.ExperimentsModel=Backbone.Model.extend({url:app.urls.experiments});var app=app||{};app.TextModelComplete=Backbone.Model.extend({url:app.urls.textdata+app.getExperimentId(),defaults:{pre_text:null,post_text:null,pre_num_sentences:null,post_num_sentences:null,pre_num_clusters:null,post_num_clusters:null,pre_num_coherent_sentences:null,post_num_coherent_sentences:null,pre_num_non_coherent_sentences:null,post_num_non_coherent_sentences:null,pre_page_duration:null,post_page_duration:null,pre_num_concepts:null,post_num_concepts:null,pre_local_cohesion:null,post_local_cohesion:null}});var app=app||{};app.ExperimentsCollection=Backbone.Collection.extend({url:app.urls.experiments});var app=app||{};app.UserCollection=Backbone.Model.extend({url:app.urls.user_experiment+"/"+app.getExperimentId()});var app=app||{};app.MeasurementCollection=Backbone.Collection.extend({model:app.MeasurementModel});var app=app||{};app.LandingView=Backbone.View.extend({el:$("#landingview"),events:{"click #editor-button":"analyzeText","click #editor-full-button":"reanalyzeText","mouseover #editor-full-medium-editor span":"onTextHover","mouseout #editor-full-medium-editor span":"onTextHoverOff"},initialize:function(){this.colors=d3.scaleOrdinal(d3.schemeCategory10),this.simulations={},this.$el.find("#landingview-editor").html(Handlebars.templates.editor({instruction:""}));var e=new MediumEditor("#editor-textinput",{toolbar:!1,placeholder:!1});if(null===localStorage.getItem("firstVisit"))$("#editor-textinput").typed({strings:app.constants.editor_textinput,typeSpeed:2,contentType:"html",cursorChar:"",callback:function(){var t=document.querySelector("#editor-textinput").firstChild;e.selectElement(t)}});else{$("#editor-textinput").html("<p>Schreibe hier ...</p>");var t=document.querySelector("#editor-textinput").firstChild;e.selectElement(t)}this.analyzer=new app.TextAnalyzerModel,_.bindAll(this,"onTextHover")},analyzeText:function(){var e=this,t=app.getParagraphs(this.$el.find("#editor-textinput"));this.$el.find("#editor-button-div").html(Handlebars.templates["loading-ring"]()),this.analyzer.set({text:t}),this.analyzer.save(null,{success:function(t){e.renderGraph("#editor-textinput",!0,"#editor-full-medium-editor","#editor-full-graph",e.colors)},error:function(t,n){console.log(n.responseText),Materialize.toast(app.constants.toast_textinput,4e3),e.$el.find("#editor-button-div").html(Handlebars.templates.text_analyze_button())}})},reanalyzeText:function(){var e=this,t=app.getParagraphs(this.$el.find("#editor-full-medium-editor"));app.getPlainText(this.$el.find("#editor-full-medium-editor"));this.$el.find("#editor-full-button-div").html(Handlebars.templates["loading-ring"]()),this.analyzer.set({text:t}),this.analyzer.save(null,{success:function(t){e.renderGraph("#editor-full-medium-editor",!1,"#editor-full-medium-editor","#editor-full-graph",e.colors),e.$el.find("#editor-full-button-div").html(Handlebars.templates.text_analyze_button_full())},error:function(t,n){Materialize.toast(app.constants.toast_textinput,4e3),e.$el.find("#editor-full-button-div").html(Handlebars.templates.text_analyze_button_full())}})},onTextHover:function(e){var t=e.currentTarget.innerText,n=this.analyzer.get("wordLemmaRelations")[t];if(n){var r=n[0];(r==e.target.innerText||this.analyzer.get("lemmaWordRelations")[r].indexOf(e.target.innerText)>-1)&&(e.currentTarget.style.color=this.colors(this.analyzer.get("word_cluster_index")[r])),e.currentTarget.className+="highlight-related";var i=d3.select("#node-"+r);i.data()[0];i.select("text").style("opacity",1).style("font-weight","bold").style("font-size","20px"),i.select("circle").style("stroke","#000").style("stroke-width",1)}},onTextHoverOff:function(e){d3.selectAll("text").style("font-weight","normal").style("font-size","16px"),d3.selectAll("circle").style("stroke","none").style("stroke-width",0),$("#editor-full-medium-editor").find("span").each(function(e,t){t.style.color=null,t.className=""})},renderGraph:function(e,t,n,r){var i=this.$el.find(e).html();this.clusters=this.analyzer.get("clusters"),t&&this.$el.find("#landingview-editor").html(Handlebars.templates["editor-full"]({text:i}));var a=(new MediumEditor(n,{toolbar:!1}),$(r).width()),s=$(n).height();$(r).empty(),this.renderCmap(this.analyzer.get("word_pairs"),this.analyzer.get("numConcepts"),this.analyzer.get("numClusters"),r,s,a,this.colors),null===localStorage.getItem("firstVisit")&&(this.$el.append(Handlebars.templates.modal_instruction()),$("#modal-instruction").openModal(),localStorage.setItem("firstVisit",!1))},renderCmap:function(e,t,n,r,i,a,s){function o(){m.attr("transform",d3.event.transform),f.attr("transform",d3.event.transform)}function l(){h.selectAll("text").style("font-weight","normal").style("font-size","16px"),h.selectAll("circle").style("stroke","none").style("stroke-width",0);var e=d3.mouse(this),t=g.find(e[0],e[1]),n=m.select("#node-"+t.id);n.data()[0];n.select("text").style("opacity",1).style("font-weight","bold").style("font-size","20px"),n.select("circle").style("stroke","#000").style("stroke-width",1);var r=t.id;app.highlightSelectedWord("#editor-full-medium-editor",r,c.analyzer.get("lemmaWordRelations"),c.colors,c.analyzer.get("word_cluster_index"))}function p(){h.selectAll("text").style("font-weight","normal").style("font-size","16px"),h.selectAll("circle").style("stroke","none").style("stroke-width",0),$("#editor-full-medium-editor").find("p").each(function(e){var t=$(this).text(),n=t.replace(/([A-z0-9'<>\u00dc\u00fc\u00e4\u00c4\u00f6\u00d6\u00df\-\/]+)/g,"<span>$1</span>"),r=$(n);$(this).html(r),$(this).append(".")})}var c=this,d=i+200,u=a,h=d3.select(r).append("svg").attr("width",u-5).attr("height",d),m=h.append("g").attr("width",u).attr("height",d),f=h.append("rect").attr("class","overlay").attr("width",u).attr("height",d).style("fill","red").style("opacity",0).on("mousemove",l).on("mouseleave",p);h.call(d3.zoom().scaleExtent([.5,1.5]).on("zoom",o));var g=(h.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",0).style("stroke","red").style("stroke-width","2"),d3.scaleLinear().domain([0,1]).range([0,u]),d3.forceSimulation(c.analyzer.get("nodes")).force("charge",d3.forceManyBody().strength(-250)).force("link",d3.forceLink(c.analyzer.get("links")).distance(80).id(function(e){return e.id})).force("center",d3.forceCenter(u/2,d/2)).force("collision",d3.forceCollide().radius(50)).force("x",d3.forceX()).force("y",d3.forceY()).stop());d3.timeout(function(){for(var e=0,t=Math.ceil(Math.log(g.alphaMin())/Math.log(1-g.alphaDecay()));e<t;++e)g.tick();var n=(m.append("g").attr("class","links").selectAll("line").data(c.analyzer.get("links")).enter().append("line").attr("x1",function(e){return e.source.x}).attr("y1",function(e){return e.source.y}).attr("x2",function(e){return e.target.x}).attr("y2",function(e){return e.target.y}).style("stroke-dasharray",function(e){if("coreference"==e.device)return"5,5"}).style("d",function(e){if("coreference"==e.device)return"M5 20 l215 0"}),m.append("g").attr("class","nodes").selectAll(".node").data(c.analyzer.get("nodes")).enter().append("g").attr("id",function(e,t){return"node-"+e.id}).attr("class","node").attr("transform",function(e){return"translate("+e.x+","+e.y+")"}));n.append("circle").attr("r",10).attr("cx",0).attr("cy",0).style("fill",function(e,t){return c.colors(c.analyzer.get("word_cluster_index")[e.id])}).attr("fill","#ccc"),n.append("text").attr("dy",-8).attr("dx",10).style("opacity",.8).attr("text-anchor","start").text(function(e){return e.id})})}}),"/"==window.location.pathname&&new app.LandingView;var app=app||{};app.LoginView=Backbone.View.extend({initialize:function(){console.log("login")}}),"/login/"==window.location.pathname&&new app.LoginView;var app=app||{};app.DashboardView=Backbone.View.extend({el:$("#dashboard"),events:{"click .table-row":"redirect"},initialize:function(){var e=this;this.experiments=new app.ExperimentsCollection,this.experiments.fetch({success:function(){e.renderExperiments()}})},renderExperiments:function(){this.$el.find("#experiments").html(Handlebars.templates.experiments({experiment:this.experiments.toJSON()})),this.$el.on(".table-row",this.redirect,this)},redirect:function(e){var t=$(e.currentTarget).attr("id");window.location=app.urls.single_experiment+t}}),"/dashboard/"==window.location.pathname&&new app.DashboardView;var app=app||{};app.ExperimentView=Backbone.View.extend({el:$("#experiment-single"),events:{"click #new-user-button":"generateUser","click #data-export-button":"dataExport"},initialize:function(){this.experiment_id=app.getExperimentId(),this.singleExperimentModel=new app.ExperimentModel,this.UserCollection=new app.UserCollection,this.UserModel=new app.UserModel;var e=this;this.singleExperimentModel.fetch({success:function(t){e.renderHeader()},error:function(){Materialize.toast("Das Experiment konnte nicht gefunden werden!",4e3)}}),this.fetchUsers()},fetchUsers:function(){var e=this;this.UserCollection.fetch({success:function(t){e.renderUsers()},error:function(){Materialize.toast("Die Nutzerdaten konnten nicht gefunden werden!",4e3)}})},renderHeader:function(){this.$("h1").first().html(this.singleExperimentModel.get("name")),this.$("#experiment-header").attr("href",app.urls.run_experiment+this.singleExperimentModel.get("master_pw"))},renderUsers:function(){this.$el.find("#users").html(Handlebars.templates.users({user:this.UserCollection.toJSON()}))},generateUser:function(){var e=this;this.UserModel.set({nr_users:1}),this.UserModel.save(null,{success:function(t,n){e.fetchUsers()},error:function(e,t){console.log(t.responseText)}})},dataExport:function(){console.log("export data"),window.open(app.urls.csv_text_data+app.getExperimentId())}}),window.location.pathname.startsWith("/experiment/")&&new app.ExperimentView,app.NewExperimentView=Backbone.View.extend({el:$("#new-experiment"),events:{"click #add-measurement":"addMeasurement","click #save-experiment":"saveExperiment"},initialize:function(){var e=this;this.groupsModel=new app.GroupsModel,this.groupsModel.fetch({success:function(t){e.renderForm()},error:function(e){console.log("Die Gruppen konnten nicht geladen werden")}}),this.measurementCollection=new app.MeasurementCollection,this.measurementModel=new app.MeasurementModel,this.experimentModel=new app.ExperimentsModel,this.listenTo(this.measurementModel,"change",this.modelChanged),this.measurements={1:0,2:0,3:0,4:0,5:0}},renderForm:function(){this.$el.find("#experiment-generator").html(Handlebars.templates["experiment-generator"]({group:this.groupsModel.toJSON()})),this.$el.find("select").material_select(),this.$el.find(".datepicker").pickadate({selectMonths:!0,selectYears:15,format:"yyyy-mm-dd"})},modelChanged:function(){this.measurementCollection.add(this.measurementModel.toJSON()),this.renderTable()},renderTable:function(){this.$el.find("#experiment-table").html(Handlebars.templates["measurements-table"]({measurement:this.measurementCollection.toJSON()}))},addMeasurement:function(){var e=this,t=this.$el.find("#form-group").val(),n=this.$el.find("#form-treatment").val(),r=this.$el.find("#form-date").val();this.measurements[t]+=1,""===r?Materialize.toast("Bitte füge noch ein Datum ein",4e3):this.measurementModel.set({experiment:"",publication:r,measure:e.measurements[t],nr_group:Number(t),instruction_first:"",group:n})},saveExperiment:function(){var e=this,t=this.$el.find("#experiment-name").val().trim();if(""===t)Materialize.toast("Bitte tragen Sie noch den Namen des Experiements ein",4e3);else{var n=new Set,r=new Set;this.measurementCollection.each(function(e){n.add(e.toJSON().nr_group),r.add(e.toJSON().measure)}),0===r.size?Materialize.toast("Bitte fügen Sie noch Messzeitpunkte ein.",4e3):(this.experimentModel.set({name:t,nr_measurements:r.size,nr_groups:n.size}),this.experimentModel.save(null,{success:function(t,n){e.saveMeasurements()},error:function(e,t){console.log(t)}}))}},saveMeasurements:function(){var e=this,t=this.measurementCollection.length;this.measurementCollection.each(function(n){n.url=app.urls.measurement+e.experimentModel.get("master_pw"),n.save(null,{success:function(e,n){t-=1,0==t&&(window.location=app.urls.dashboard)},error:function(e,t){console.log(t.responseText)}})})}}),"/new-experiment/"==window.location.pathname&&new app.NewExperimentView,app.SubjectLoginView=Backbone.View.extend({el:$("#subject-login"),events:{"submit form":"submit"},initialize:function(){},submit:function(){event.preventDefault();var e=this.$el.find("#username").val();tidyUsername=e.replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue").replace(/Ä/g,"ae").replace(/Ö/g,"oe").replace(/Ü/g,"ue").replace(/ß/g,"ss").toLowerCase();var t=/^([a-z]{2,4}(0[1-9]|[12]\d|3[01])[a-z]{2,4}[2-5]{1}[0-9]{1})$/;if(8==e.length&&t.test(tidyUsername)){var n=app.getCookie("csrftoken");$.ajax({beforeSend:function(e,t){!app.csrfSafeMethod(t.type)&&app.sameOrigin(t.url)&&e.setRequestHeader("X-CSRFToken",n)},type:"POST",url:window.location.href,data:{username:tidyUsername},success:function(e){window.location=app.urls.run_experiment+app.getExperimentId()},error:function(e){console.log(e.responseText),Materialize.toast(e.responseText,4e3)}})}else Materialize.toast("Ihr Nutzername entspricht nicht dem Muster.",4e3)}}),window.location.pathname.startsWith("/login-experiment")&&new app.SubjectLoginView;
//# sourceMappingURL=app.js.map

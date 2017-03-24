!function(e){var t=Backbone.Model.extend({url:url_api_textanalyzer}),n=Backbone.Model.extend({url:url_api_user_specific+get_experiment_id()}),s=Backbone.Model.extend({url:url_api_textdata+get_experiment_id(),defaults:{pre_text:null,post_text:null,pre_num_sentences:null,post_num_sentences:null,pre_num_clusters:null,post_num_clusters:null,pre_num_coherent_sentences:null,post_num_coherent_sentences:null,pre_num_non_coherent_sentences:null,post_num_non_coherent_sentences:null,pre_page_duration:null,post_page_duration:null,pre_num_concepts:null,post_num_concepts:null}}),a=Backbone.View.extend({el:e(".measurement"),events:{"click #measurement_instruction-button":"renderExperiment","click #measurement_measurement-input-button":"analyzeText","click #measurement_measurement-review-send-button":"sendData","keyup #measurement_measurement-review-text textarea":"reviseText"},initialize:function(){var a=this;this.toggle_text=!1,this.prePageDurationStart=null,this.postPageDurationStart=null,this.instruction_template=_.template(e("#measurement_measurement-instruction-template").html()),this.input_template=_.template(e("#measurement_measurement-input-text-template").html()),this.loading_template=_.template(e("#loading-ring-template").html()),this.review_template=_.template(e("#measurement_measurement-review-template").html()),this.text_save_error_template=_.template(e("#measurement_error").html()),this.user_model=new n,this.text_complete_model=new s,this.analyzer=new t,this.user_model.fetch({success:function(){a.renderInstruction()},error:function(){console.log("error fetching user data")}})},renderInstruction:function(){this.$el.html(this.instruction_template({instruction:this.user_model.get("instruction")}))},renderExperiment:function(){this.prePageDurationStart=new Date,this.$el.html(this.input_template());var t=e(window).height(),n=e("#measurement_measurement-input");n.html(this.input_template());var s=e("#measurement_measurement-input-textarea");s.focus(),e("#measurement_measurement-input").find("textarea").height(.6*t)},reviseText:function(){var t=e("#measurement_measurement-review-text").find("textarea").val();this.text_complete_model.set({post_text:t})},analyzeText:function(){var t=(new Date-this.prePageDurationStart)/1e3;this.text_complete_model.set({pre_page_duration:t}),this.postPageDurationStart=new Date;var n=this,s=e("textarea#measurement_measurement-input-textarea").val();s=s.replace(/(\r\n|\n|\r)/gm," "),this.analyzer.set({text:s}),this.$el.html(this.loading_template()),this.analyzer.save(null,{success:function(e){n.renderSVG()},error:function(e,t){console.log(t.responseText)}})},sendData:function(){var e=(new Date-this.postPageDurationStart)/1e3;this.text_complete_model.set({post_page_duration:e})},renderSVG:function(){this.text_complete_model.set({pre_text:this.analyzer.get("text"),pre_num_sentences:this.analyzer.get("numSentences"),pre_num_clusters:this.analyzer.get("numClusters"),pre_num_coherent_sentences:this.analyzer.get("cohSentences"),pre_num_non_coherent_sentences:this.analyzer.get("cohNotSentences"),pre_num_concepts:this.analyzer.get("numConcepts"),post_text:this.analyzer.get("text")}),this.$el.html(this.review_template({text:this.analyzer.get("text")}));var t=e("#measurement_review-div");t.hide(),window.setTimeout(function(){t.show(1e3,"swing")},6e4),this.setContainerHeight(),this.$el.css("padding-top","10px"),this.$el.css("padding-left","15px");var n=e(window).height(),s=.95*n,a=e("#measurement_measurement-graph").width();renderCmap(this.analyzer.get("word_pairs"),this.analyzer.get("clusters"),this.analyzer.get("numClusters"),"#measurement_measurement-graph",s,a)},setContainerHeight:function(){var t=e("#measurement_measurement-review-text").find("textarea"),n=e(window).height();t.height(.83*n)},analyzePostText:function(){var t=this;this.analyzer.clear(),this.analyzer.clear(),this.analyzer.set({text:this.text_complete_model.get("post_text")}),e("#measurement_modal").foundation("close"),this.$el.html(this.loading_template()),this.$el.css("padding-top","60px"),this.analyzer.save(null,{success:function(e){t.saveDataMeasurement()},error:function(e,t){console.log("error")}})},saveDataMeasurement:function(){this.text_complete_model.set({post_num_sentences:this.analyzer.get("numSentences"),post_num_clusters:this.analyzer.get("numClusters"),post_num_coherent_sentences:this.analyzer.get("cohSentences"),post_num_non_coherent_sentences:this.analyzer.get("cohNotSentences"),post_num_concepts:this.analyzer.get("numConcepts")}),this.text_complete_model.save(null,{success:function(e){location.reload()},error:function(e,t){this.$el.html(text_save_error_template())}})}}),r=Backbone.View.extend({el:e("#measurement_modal"),events:{"click #measurement_send-button":"sendPostText"},initialize:function(){},sendPostText:function(){i.analyzePostText()}}),i=new a;new r}($);
//# sourceMappingURL=cmap_revision_delay.js.map
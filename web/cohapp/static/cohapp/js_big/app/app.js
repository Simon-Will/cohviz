var app = app || {};

/**
 * Landing View for application
 */
app.urls = function() {
    this.url =  window.location.href;
    var url_split = this.url.split('/');

    this.url = window.location.href;
    this.split = this.url.split('/');
    this.website = this.split[0] + '//' + this.split[2];
    this.dashboard = this.website + "/dashboard/";

    // Api endpoints
    this.experiments = this.website + '/apis/experiments/';
    this.measurement = this.website + '/apis/measurements/';
    this.experiment = this.website + '/apis/experiment/';
    this.user_specific = this.website + '/apis/user-specific/';
    this.user_experiment = this.website + '/apis/user-experiment/';
    this.user_specific_name = this.website + '/apis/user-specific-name/';
    this.user = this.website + '/apis/user-experiment/';
    this.registration = this.website + '/apis/registration/';
    this.groups = this.website + '/apis/groups/';
    this.textanalyzer = this.website + '/apis/textanalyzer/';
    this.textdata = this.website + '/apis/textdata/';
    this.csv_text_data = this.website + '/csv_text_export/';

    this.single_experiment = this.website + '/experiment/';
    this.run_experiment = this.website + '/run-experiment/';
    
    return this;
}();

/**
 * Constants for app
 */
app.constants = function() {
    this.editor_textinput = ["<p>Der Editor zur Analyse der Kohärenz von Texten.</p>",
        "<p>Schreibe hier deinen Text, klicke auf <em>Analyziere Text</em> und lass dir anzeigen, wie kohärent dein Text ist.</p>"];
    this.toast_textinput = ['Dein Text konnte nicht verarbeitet werden! \
                             Schaue, ob du mindestens zwei Sätze geschrieben hast.'];
    this.simpleRevisionModal = "Sie haben nun die Gelegenheit Ihren Text zu überarbeiten. \
                                Versuchen Sie potentielle Kohärenzbrüche in Ihrem Text zu \
                                schließen und Bezüge zwischen den Konzepten klar darzustellen. \
                                Integrieren Sie in Ihrer Überarbeitung auch Konzepte und Verbindungen \
                                zwischen Konzepten, die Sie eventuell in Ihrem Entwurf noch nicht \
                                bedacht haben.";
    return this;
}();

/**
 * Get id of experiment based on path of url
 * @return {Number} id of experiment
 */
app.getExperimentId = function() {
    var path = window.location.href;
    var experiment_id = path.substr(path.lastIndexOf('/') + 1);
    
    return experiment_id;
};

app.regExText = function(id) {
    var textToChange = $('#editor-textinput').html();
    
    // textToChange = textToChange.replace(/CLT/g, 'Cognitive-Load-Theory');
    textToChange = textToChange.replace(/[Cc]ognitive [Ll]oad [Tt]heor(y|(ie))/g, 'Cognitive-Load-Theory');
    // textToChange = textToChange.replace(/[Cc]ognitive [Ll]oad/g, 'Kognitive-Belastung');
    // textToChange = textToChange.replace(/[Kk]ognitiv[rn]? [Bb]elastung/g, 'Kognitive-Belastung');
    textToChange = textToChange.replace(/[Ee]xtrinsischer? [Bb]elastung/g, 'Extrinsische-Belastung');
    textToChange = textToChange.replace(/[Ii]ntrinsischer? [Bb]elastung/g, 'Intrinsische-Belastung');
    textToChange = textToChange.replace(/[Ll]ernbezogener? [Bb]elastung/g, 'Lernbezogene-Belastung');
    textToChange = textToChange.replace(/[Ee]xtrinsic [Ll]oad/, 'Extrinsic-Load');
    textToChange = textToChange.replace(/[Ii]ntrinsic [Ll]oad/g, 'Intrinsic-Load');
    textToChange = textToChange.replace(/[Gg]ermane [Ll]oad/g, 'Germane-Load');
    // textToChange = textToChange.replace(/[Aa]rbeitsgedächtnisses/g, 'Arbeitsgedächtnis');
    textToChange = textToChange.replace(/bzw.?/g, 'beziehungsweise');

    // textToChange = textToChange.replace(/[Ss]ensorischer [Ss]peicher/g, 'Sensorisches-Gedächtnis');
    // textToChange = textToChange.replace(/[Ss]ensorische[sn]? [Gg]edächtnis/g, 'Sensorisches-Gedächtnis');
    // textToChange = textToChange.replace(/[Dd]reispeichermodells?/g, 'Drei-Speicher-Modell');

    $(id).html(textToChange);
};

/**
 * Get text from multiple paragraphs
 * @param {jQuery Object} div div that includes multiple paragraphs
 */
app.getParagraphs = function(div) {
    // All paragraphs in text
    var paragraphs = div.find('p');

    // Api needs a single string. We need to get the text from 
    // the paragraphs
    var paragraphText = '';
    paragraphs.each(function(paragraph) {
        
        paragraphText += paragraphs[paragraph].innerText + " ";
    });

    // Remove line breaks from string
    paragraphText.replace(/(\r\n|\n|\r)/gm,"");

    // Remove tabs, newlines and too many spaces
    paragraphText.replace(/\s\s+/g, '');

    return paragraphText;
};

/**
 * Escape all occurences of string
 * @return {String} Replacements
 */
app.escapeRegExp = function(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
};

app.replaceAll = function(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
};

// app.type = function(string,element){
//     console.log(string);
//     (function writer(i){
//         if(string.length <= i++){
//         element.value = string;
//         return;
//     }
    
//     element.value = string.substring(0,i);
    
//     if( element.value[element.value.length-1] != " " )element.focus();
//         var rand = Math.floor(Math.random() * (100)) + 140;
//         setTimeout(function(){writer(i);},rand);
//     })(0);
// };

app.getCookie = function(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                 break;
            }
        }
    }
    return cookieValue;
};

app.csrfSafeMethod = function(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
};

app.sameOrigin = function(url) {
    // test that a given url is a same-origin URL
    // url could be relative or scheme relative or absolute
    var host = document.location.host; // host + port
    var protocol = document.location.protocol;
    var sr_origin = '//' + host;
    var origin = protocol + sr_origin;
    // Allow absolute or scheme relative URLs to same origin
    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
        // or any other URL that isn't scheme relative or absolute i.e relative.
        !(/^(\/\/|http:|https:).*/.test(url));
};

// *
//  * Highlights each paragraph with the corresponding
//  * words
//  * @param  {String}  divId         Id of medium editor
//  * @param  {Array}   clusters      Array of all clusters
//  * @param  {Array}   colors        20 distinct colors
//  * @param  {String}  word          word of cluster that should be highlighted
//  * @param  {Boolean} singleCluster Wheter a single cluster should be highlighted
//  * @return {null} 
 
app.highlightWholeText = function(divId, clusters, colors) {
    $(divId).find('p').each(function(paragraph) {
        var textParagraph = $(this).text();
        $(this).html(app.colorText(textParagraph, this, clusters, colors));
    });
};


app.colorText = function(text, paragraph, clusters, colors) {

    // Save text in variable
    var newText = text;

    // Get each word in paragraph and remove punctuation from text
    var words = text.replace(/[.,\/#!$%\^&\*;:{}=_`~()]/g,"").split(" ");
    
    // Split whole text string
    var newTextSplit = newText.replace(/[^\wöäüÄÖÜß-\s]|_/g, function ($1) { return ' ' + $1 + ' ';}).replace(/[ ]+/g, ' ').split(' ');

    // Loop over whole text
    for (var i = 0; i < newTextSplit.length; i++) {
        var splitWord = newTextSplit[i];

        for (var cluster = 0; cluster < clusters.length; cluster++) {
            if ($.inArray(splitWord, clusters[cluster]) != -1) {
                newTextSplit[i] = splitWord.replace(splitWord,
                    '<a style="background-color: ' +
                    colors(cluster) + ';color: #fff;border-radius: 3px; padding: 1px 3px;" class="cluster' + cluster + '">' +
                    splitWord + '</a>');
            }
        }
    }

    return newTextSplit.join(' ');
};

app.highlightSelectedWord = function(divId, wordSelected, wordsUnselected, lemmaDic, clusters, colors) {

    // Expand unselected words with lemmaDics
    var updateWordsUnselected = [];

    // Loop over unselected words
    for (var bah = 0; bah < wordsUnselected.length; bah++) {
        // Save lemmas of unselected word
        var dicLemma = lemmaDic[wordsUnselected[bah]];

        // Loop over lemmas
        for (var lemma = 0; lemma < dicLemma.length; lemma++) {
            // Append to list
            updateWordsUnselected.push(dicLemma[lemma]);
        }
    }

    // Update unselected words with lemmas
    wordsUnselected = updateWordsUnselected;

    // Loop over every paragraph
    $(divId).find('p').each(function(paragraph) {
        var textParagraph = $(this).text();

        // Get cluster with word
        var cluster = null;
        
        // Get id of cluster the word is in
        for (var p = 0; p < clusters.length; p++) {
            if (clusters[p].indexOf(wordSelected) != -1) {
                cluster = p;
            }
        }

        // Save text in variable
        var newText = textParagraph;

        // Get each word in paragraph and remove punctuation from text
        var words = textParagraph.replace(/[.,\/#!$%\^&\*;:{}=_`~()]/g,"").split(" ");
        
        // Split whole text string
        var newTextSplit = newText.replace(/[^\wöäüÄÖÜß-\s]|_/g, function ($1) { return ' ' + $1 + ' ';}).replace(/[ ]+/g, ' ').split(' ');

        // Used words 
        var usedWords = [];
        // Loop over every word in paragraph
        for (var i = 0; i < newTextSplit.length; i++) {
            // Save current word in paragraph in variable
            var splitWord = newTextSplit[i];

            // Check if word should be highlighted at all
            if ($.inArray(splitWord, clusters[cluster]) != -1) {
                // Loop over every word that applies to the specific lemma
                for (var j = 0; j < lemmaDic[wordSelected].length; j++) {
                    var lemmaWord = lemmaDic[wordSelected][j];
                    // Should word be emphasized
                    if (splitWord === lemmaWord) {
                        usedWords.push(lemmaWord);

                        // Highlight word that user currently looks at
                        newTextSplit[i] = splitWord.replace(splitWord,
                            '<a style="background-color: ' +
                            colors(cluster) + ';color: #fff;font-weight:bold; font-size: 1.3em; border-radius: 3px; padding: 1px 3px;" class="cluster' + cluster + '">' +
                            splitWord + '</a>');
                    }
                }

                // Loop over every word that is related to the target word
                for (var foo = 0; foo < wordsUnselected.length; foo++) {
                    // Save current word
                    var unselectedWord = wordsUnselected[foo];

                    // The current word in the paragraph is
                    // in the same as the related word
                    if (splitWord === unselectedWord) {
                        // Tell the usedWords array that we already highlighted
                        // the current word
                        usedWords.push(unselectedWord);

                        // Highlight related word of target word in text
                        newTextSplit[i] = splitWord.replace(splitWord,
                            '<a style="background-color: ' +
                            colors(cluster) + ';color: #fff; opacity: 0.7; border-radius: 3px; padding: 1px 3px;" class="cluster' + cluster + '">' +
                            splitWord + '</a>');
                    }
                }

                // if ($.inArray(splitWord, usedWords) == -1) {
                //     newTextSplit[i] = splitWord.replace(splitWord,
                //         '<a style="background-color: ' +
                //         colors(cluster) + ';color: #fff; opacity: 0.6; border-radius: 3px; padding: 1px 3px;" class="cluster' + cluster + '">' +
                //         splitWord + '</a>');
                // }
            }
        }

        // Return paragraph with highlighting
        $(this).html(newTextSplit.join(' '));
    });
};

app.getLinksNodes = function(wordpairs) {
    // Variable declaration
    var links = [];
    var uniqueLinks = [];
    var nodes = [];
    var edges = [];

    // Save all word-pairs in different format
    wordpairs.forEach(function(pair) {
        links.push(pair[0]);
        links.push(pair[1]);
    });

    // Remove duplicates
    $.each(links, function(i, el){
        if($.inArray(el, uniqueLinks) === -1) uniqueLinks.push(el);
    });

    $.each(uniqueLinks, function(i) {
        nodes.push({"index": i, "id": uniqueLinks[i]});
    });
    

    // Generate links
    $.each(wordpairs, function(i) {
        // Get indexes of texts
        // var source = uniqueLinks.indexOf(wordpairs[i][0]);
        // var target = uniqueLinks.indexOf(wordpairs[i][1]);
        // console.log(wordpairs[i][0]);
        // Push to edges
        edges.push({'source': wordpairs[i][0], 'target': wordpairs[i][1]});
    });


    // Save nodes and edges to graph object
    var graph = {
        "nodes": nodes,
        "links": edges,
    };

    return graph;
};


/**
 * Renders a simple concept map of forces
 * @param  {Object} pairs       word-pairs of a text
 * @param  {Object} clust       clusters of words
 * @param  {Number} numClusters number of clusters of a text
 * @param  {String} svgID       id of dom element for svg
 * @param  {Number} height      height of svg 
 * @param  {Number} width       width of svg
 */
// app.renderCmap = function(pairs, clust, numClusters, svgID, height, width, colors)  {
    
// }
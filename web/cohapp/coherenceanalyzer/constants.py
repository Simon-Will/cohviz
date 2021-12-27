# coding: utf8

import os

this_dir = os.path.dirname(os.path.realpath(__file__))

# RFTagger files
default_rf_tagger_path = os.path.join(this_dir, "RFTagger")
rf_tagger_path = os.environ.get("RF_TAGGER_ROOT", default_rf_tagger_path)

tokenizer = os.path.join(rf_tagger_path, "cmd/tokenize.perl")
rftagger = os.path.join(rf_tagger_path, "bin/rft-annotate")
german_par = os.path.join(rf_tagger_path, "lib/german.par")

# Temporary files
temp_dir = os.path.join(this_dir, "temp")
if not os.path.exists(temp_dir):
    os.makedirs(temp_dir)

temp_text = os.path.join(temp_dir, "text")
temp_tokens = os.path.join(temp_dir, "tokens")
temp_tags = os.path.join(temp_dir, "tags")

# Debug files
debug = os.path.join(temp_dir, "debug.txt")

FROM python:2.7-buster

MAINTAINER Christian Burkhart

# Import public key for mongodb and install packages
RUN apt-get update -y && apt-get install -y wget gnupg \
	&& wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add - \
	&& echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/5.0 main" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list \
	&& apt-get update -y \
	&& apt-get install -y vim mongodb-org python-enchant \
	&& pip install -U wheel setuptools pip

COPY requirements.txt /code/
RUN pip install -r /code/requirements.txt

RUN python -m spacy download en_core_web_md \
	&& python -m spacy download de_core_news_md

RUN python -c "import nltk; nltk.download('wordnet', download_dir='/usr/local/nltk_data')" \
	    && python -c "import nltk; nltk.download('punkt', download_dir='/usr/local/nltk_data')"

COPY package.json package-lock.json /code/
WORKDIR /code

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - \
	&& apt-get install nodejs=6.14.4-1nodesource1 \
	&& npm install --global gulp-cli \
	&& npm install

RUN wget --no-verbose "https://www.cis.lmu.de/~schmid/tools/RFTagger/data/RFTagger.zip" -O /tmp/RFTagger.zip \
	&& unzip /tmp/RFTagger.zip -d /code \
	&& bash -c "cd /code/RFTagger/src && make"

COPY . /code/

ENV HOME /code
ENV RF_TAGGER_ROOT /code/RFTagger

ENTRYPOINT ["bash", "prepare_app_and_execute.sh"]
CMD ["gunicorn", "toolapp.wsgi:application", "-w", "1", "-t", "120", "-b", ":8000", "--reload"]

from django.urls import include, path
from django.contrib import admin

from cohapp import apis
from cohapp import views as cohviews

# Temporary urls
# http://stackoverflow.com/questions/1360101/how-to-generate-temporary-urls-in-django

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', cohviews.index, name='index'),
    path('dashboard/', cohviews.dashboard, name='dashboard'),
    path('login/', cohviews.login, name='login'),
    path('logout-subject/<experiment_id>', cohviews.logout_subject, name="logout-subject"),
    path('logout/', cohviews.logout, name='logout'),
    path('new-experiment/', cohviews.new_experiment, name='new-experiment'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('experiment/<experiment_password>', cohviews.experiment, name='experiment'),
    path('login-experiment/<experiment_password>', cohviews.login_experiment, name='login_experiment'),
    path('login_exp_redirect/', cohviews.login_exp_redirect, name='login_exp_redirect'),
    path('run-experiment/<experiment_password>', cohviews.run_experiment, name='run_experiment'),
    path('csv_text_export/<experiment_password>', cohviews.csv_text_view, name='csv_text_export'),

    # ************** APIs *********************************************
    path('apis/user-specific/<experiment_password>', apis.UserSpecificView.as_view()),
    path('apis/user-specific-name/<user_name>/<experiment_id>', apis.UserSpecificNameView.as_view()),
    path('apis/user-experiment/<experiment_password>', apis.UserExperimentView.as_view()),
    path('apis/experiments/', apis.ExperimentView.as_view()),
    path('apis/measurements/<experiment_password>', apis.MeasurementView.as_view(), name='measurement_api'),
    path('apis/experiment/<experiment_password>', apis.SingleExperimentView.as_view(), name='single_experiment_api'),
    path('apis/registration/<user_name>/<experiment_id>', apis.RegistrationView.as_view(), name='registration_view'),
    path('apis/groups/', apis.GroupView.as_view(), name='group_api'),
    path('apis/textanalyzer/', apis.TextAnalyzer.as_view()),
    path('apis/textanalyzer/<experiment_password>', apis.TextAnalyzer.as_view()),
    path('apis/textdata/<experiment_password>', apis.TextDataView.as_view())
]

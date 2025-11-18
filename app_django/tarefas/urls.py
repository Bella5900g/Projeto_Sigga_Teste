from django.urls import path
from . import views

urlpatterns = [
    # Páginas HTML
    path('', views.login_view, name='home'),
    path('login', views.login_view, name='login'),
    path('dashboard', views.dashboard_view, name='dashboard'),
    path('tarefas', views.tarefas_view, name='tarefas'),
    
    # APIs
    path('api/login', views.api_login, name='api_login'),
    path('api/logout', views.api_logout, name='api_logout'),
    path('api/tarefas/<int:tarefa_id>', views.api_tarefas_update, name='api_tarefas_update'),
    path('api/tarefas/<int:tarefa_id>/delete', views.api_tarefas_delete, name='api_tarefas_delete'),
    path('api/tarefas', views.api_tarefas, name='api_tarefas'),  # GET e POST na mesma view
]


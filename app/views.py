# -*- coding: utf-8 -*-
from django.shortcuts import render, render_to_response
from django.http import HttpResponse
from django.template import RequestContext

import json

# Create your views here.

def index(request):
    request.META["CSRF_OOKIE_USED"] = True
    context = {
        'role': request.session.get('role', 1)
    }
    return render_to_response('index.html', RequestContext(request, context))

def test(request):
    return HttpResponse('test')

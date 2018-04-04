# coding=utf-8
from tornado.web import authenticated

from . import BaseHandler


class AdminDashboardHandler(BaseHandler):
    """Administrator's dashboard"""

    @authenticated
    def get(self):
        self.render('admin/dashboard.html')


class PostBlogHandler(BaseHandler):
    """Post new blog"""

    @authenticated
    def get(self):
        self.render('admin/post_blog.html')
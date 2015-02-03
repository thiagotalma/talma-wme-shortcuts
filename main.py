#!/usr/bin/env python
#
#
import urllib2

from google.appengine.ext import webapp
import webapp2


class MainPage(webapp.RequestHandler):
    def output_file(self, url,):

        try:
            self.response.headers['Cache-Control'] = 'no-cache, must-revalidate'
            self.response.headers['Expires'] = "Sat, 26 Jul 1997 05:00:00 GMT"
            response = urllib2.urlopen(url)
            html = response.read()
            self.response.out.write(html)
            return
        except IOError:
            self.error(404)
            return

    def get(self, dir, file, extension):

        if extension != 'js':
            self.error(404)
            return

        self.response.headers['Content-Type'] = 'application/x-javascript'

        try:
            if file == 'acertarNomeRua':
                url = 'https://dl.dropboxusercontent.com/s/iwq52dp7fe7al27/acertarNomeRua.js'
            else:
                self.error(404)
                return

            self.output_file(url)
        except:
            self.error(404)
            return


app = webapp2.WSGIApplication([(r'/(.*)/([^.]*).(.*)', MainPage)], debug=True)
import http.server

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
  def end_headers(self):
    self.send_header('Access-Control-Allow-Origin', '*')
    super().end_headers()
if __name__ == '__main__':
  PORT = 8000
  with http.server.HTTPServer(('', PORT), CORSRequestHandler) as httpd:
    print(f'Serving at port {PORT}')
    httpd.serve_forever()

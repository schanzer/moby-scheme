#lang scheme/base
(require "../compiler/beginner-to-javascript.ss"
         "../compiler/pinfo.ss"
         "../template.ss"
         "../compiler/permission.ss"
         "net.ss"
         scheme/local
         scheme/runtime-path
         scheme/string
         web-server/servlet
         web-server/servlet-env
         web-server/dispatch)


(define-runtime-path javascript-support "../../support/js")
(define-runtime-path javascript-main-template "../../support/js/main.js.template")




(define-struct jsworld-widget (attrs) #:prefab)
(define-struct (jsworld-widget:div jsworld-widget) () #:prefab)
(define-struct (jsworld-widget:p jsworld-widget) () #:prefab)
(define-struct (jsworld-widget:button jsworld-widget) (f ef) #:prefab)
(define-struct (jsworld-widget:input jsworld-widget) (type) #:prefab)
(define-struct (jsworld-widget:bidirectional-input jsworld-widget) (type val-f update-f) #:prefab)
(define-struct (jsworld-widget:img jsworld-widget) (src) #:prefab)
(define-struct (jsworld-widget:text jsworld-widget) (text) #:prefab)
(define-struct (jsworld-widget:node jsworld-widget) (node) #:prefab)


(define (js-div . attrs)
  (make-jsworld-widget:div attrs))

(define (js-p . attrs)
  (make-jsworld-widget:p attrs))

(define (js-button f . attrs)
  (make-jsworld-widget:button attrs f (lambda (w) '())))

(define (js-button* f ef . attrs)
  (make-jsworld-widget:button attrs f ef))

(define (js-input type . attrs)
  (make-jsworld-widget:input attrs type))

(define (js-bidirectional-input type val-f update-f . attrs)
  (make-jsworld-widget:bidirectional-input attrs type val-f update-f))

(define (js-img src . attrs)
  (make-jsworld-widget:img attrs src))

(define (js-text text . attrs)
  (make-jsworld-widget:text attrs text))

(define (js-node raw-node . attrs)
  (make-jsworld-widget:node attrs raw-node))
  





;; js-big-bang/source: (listof stx) world0 . (listof handler) -> void
;; Generate a web site that compiles and evaluates the program.
(define (js-big-bang/source source-code initWorld . handlers)
  (local [(define main.js 
            (compiled-program->main.js (do-compilation source-code)))

          (define-values (dispatcher url)
            (dispatch-rules
             [("main.js") main-js]
             [("networkProxy") network-proxy]))
            
          (define (main-js req)
            (list #"text/javascript"
                  main.js))
          
          (define (network-proxy req)
            (list #"text/plain"
                  (get-url (extract-binding/single 'url (request-bindings req)))))]
    (serve/servlet dispatcher
                   #:listen-ip #f
                   #:servlet-path "/"
                   #:servlet-regexp #rx"(^/main.js$)|(^/networkProxy)"
                   #:extra-files-paths (list javascript-support))))


;;; FIXME: A lot of this is just copy-and-pasted from generate-application.  FIXME!

(define (do-compilation program)
  (program->compiled-program/pinfo program (get-base-pinfo 'moby)))

;; compiled-program->main.js: compiled-program -> string
(define (compiled-program->main.js compiled-program)
  (let*-values ([(defns pinfo)
                (values (compiled-program-defns compiled-program)
                        (compiled-program-pinfo compiled-program))]
               [(output-port) (open-output-string)]
               [(mappings) 
                (build-mappings 
                 (PROGRAM-DEFINITIONS defns)
                 (IMAGES (string-append "[" "]"))
                 (PROGRAM-TOPLEVEL-EXPRESSIONS
                  (compiled-program-toplevel-exprs
                   compiled-program))
		 (PERMISSIONS (get-permission-js-array (pinfo-permissions pinfo))))])
    (fill-template-port (open-input-file javascript-main-template)
                        output-port
                        mappings)
    (get-output-string output-port)))

;; get-permission-js-array: (listof permission) -> string
(define (get-permission-js-array perms) 
  (string-append "["
		 (string-join (map (lambda (x)
				     (format "string_dash__greaterthan_permission(~s)" (permission->string x)))
				   perms)
			      ", ")
		 "]"))





;; FIXME: contracts!
(provide js-big-bang/source
         js-div
         js-p
         js-button
         js-button*
         js-input
         js-bidirectional-input
         js-img
         js-text
         js-node)
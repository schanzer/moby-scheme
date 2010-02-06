#lang setup/infotab
(define name "The Moby Scheme Compiler")

;; Temporarily disabling the command-line launcher.
#;(define mred-launcher-libraries (list "src/moby.ss"))
#;(define mred-launcher-names (list "moby"))
(define requires (list (list "mred")))
(define required-core-version "4.2")

(define tools (list (list "src/tool.ss")))

(define compile-omit-paths (list "doc"
                                 "examples"
                                 "sandbox"
                                 "stub"
                                 "support"
	                         "tmp"))

(define categories '(devtools))
(define repositories '("4.x"))

(define primary-file "moby-lang.ss")

(define scribblings 
  '(("manual.scrbl" ())))

(define blurb '("Provides a compiler from Advanced Student Language+world to Javascript "
                "for both web browsers and mobile smartphones."))

(define release-notes '("Intermediate release to fix issues with PLT Scheme 4.2.4."))
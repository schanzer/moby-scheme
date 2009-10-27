(define number-of-tests 0)
(define number-of-skipped-tests 0)
(define number-of-errors 0)
 
(define error-messages empty)
 
(define (add-error-message! msg)
  (set! error-messages (append error-messages (list msg))))
 
 
(define (test expect fun args)
  (begin
    (set! number-of-tests (add1 number-of-tests))
    (let ([res (if (procedure? fun)
		      (apply fun args)
		         (car args))])
      (let ([ok? (equal? expect res)])
	(cond [(not ok?)
               (begin
                 (add-error-message! (format "expected ~s, got ~s, on ~s" 
                                             expect
                                             res
                                             (cons fun args)))
                 (set! number-of-errors (add1 number-of-errors))
                 false)]
	            [else
		            ok?])))))


;; Just a note to myself about which tests need to be fixed.
(define (skip f)
  (begin
    (set! number-of-skipped-tests (add1 number-of-skipped-tests))))
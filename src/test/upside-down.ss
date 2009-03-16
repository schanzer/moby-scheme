;; The first three lines of this file were inserted by DrScheme. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-reader.ss" "lang")((modname upside-down) (read-case-sensitive #t) (teachpacks ((lib "world.ss" "teachpack" "htdp"))) (htdp-settings #(#t constructor repeating-decimal #f #t none #f ((lib "world.ss" "teachpack" "htdp")))))
(require (lib "world.ss" "moby" "stub"))
(require (lib "tilt.ss" "moby" "stub"))

(define width 300)
(define height 100)

;; The world is a boolean, which is true if we've been
;; flipped upside down.
(define initial-world false)

(define (render-world a-world)
  (place-image 
   (text (cond [a-world
                "upside down"]
               [else
                "right side up"])
         20
         "blue")
   0
   50
   (empty-scene width height)))


(define (handle-orientation-change a-world azimuth pitch roll)
  (or (> (abs pitch) 120)
      (> (abs roll) 120)))

(big-bang width height 1/10 initial-world)
(on-redraw render-world)
(on-orientation-change-event handle-orientation-change)
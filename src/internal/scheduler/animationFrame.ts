import { AnimationFrameAction } from './AnimationFrameAction';
import { AnimationFrameScheduler } from './AnimationFrameScheduler';

var observable = Rx.Observable.create(function (observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
});

console.log('before subscribe');
observable.observeOn(Rx.Scheduler.async) // 設為 async
.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
console.log('after subscribe');

/**
 *
 * Animation Frame Scheduler
 *
 * <span class="informal">Perform task when `window.requestAnimationFrame` would fire</span>
 *
 * When `animationFrame` scheduler is used with delay, it will fall back to {@link asyncScheduler} scheduler
 * behaviour.
 *
 * Without delay, `animationFrame` scheduler can be used to create smooth browser animations.
 * It makes sure scheduled task will happen just before next browser content repaint,
 * thus performing animations as efficiently as possible.
 *
 * ## Example
 * Schedule div height animation
 * ```javascript
 * const div = document.querySelector('.some-div');
 *
 * Rx.Scheduler.animationFrame.schedule(function(height) {
 *   div.style.height = height + "px";
 *
 *   this.schedule(height + 1);  // `this` references currently executing Action,
 *                               // which we reschedule with new state
 * }, 0, 0);
 *
 * // You will see .some-div element growing in height
 * ```
 *
 * @static true
 * @name animationFrame
 * @owner Scheduler
 */

export const animationFrame = new AnimationFrameScheduler(AnimationFrameAction);

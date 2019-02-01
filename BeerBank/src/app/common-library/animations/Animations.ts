import { animate, query, stagger, style, transition, trigger } from "@angular/animations";

export const staggeredFadeAnimation = trigger("staggeredFadeAnimation", [
    transition('* => *', [ // each time the binding value changes
        query(":enter", [
            style({ opacity: 0 }),
            stagger(66, [
                animate("0.3s cubic-bezier(0.680, -0.550, 0.265, 1.550)", style({ opacity: 1 }))
            ])
        ], { optional: true }),
        query(":leave", [
            animate("0.15s cubic-bezier(0.680, -0.550, 0.265, 1.550)", style({ opacity: 0 }))
        ], { optional: true })
    ])
]);
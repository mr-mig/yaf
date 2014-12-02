**Y**et **A**nother **F**ramework for "evolvable" web apps.

## Nota bene!
The framework is intended to be "library-independent", but **current implementation is built on top of AngularJS 1.3.**.  
All core abstractions are **separated** from angular-specific stuff.

The idea is based on [organicjs](https://github.com/organicjs/organicjs) abstractions.
This is a playground for making those abstractions better by trying them on real use cases.

This is a Work-In-Progress implementation, **API will change often and unpredictably**.

## Why another framework?
Angular provides general purpose abstractions and some useful tools.  
But there are no official guidelines and conventions for app development.

This framework uses angular underneath, but provide some **opinionated conventions** and **higher-level fine-grained abstractions**.

## Main goals
1. Modular, reusable, *replacable*, self-contained web components (based on AMD/CommonJS).
2. Fine-grained abstractions for "visible elements" with **strict roles**.  
  `element`, `composite`, `screen`
3. Limited number of powerfull **dataflow** abstractions.  
  `state`, `link`, `channel`
4. **Portable** and **replacable** web elements (make 'em once and use in all related projects).
5. **Logical "layered" project structure** with easy navigation.
6. Easier **complexity and growth** control.
7. **Explicit** state and state relations with one-way explicit bindings.
8. Interoperable with **legacy angular code**.

## Should I try using it?
You should give it a try if you are building an "evolvable" web app and have some room for experiments.

Here is a checklist to help you decide:
* [ ] The app has **non-trivial** functionality (not a form-based CRUD).
* [ ] The app **will eventually grow** and become more complex.
* [ ] The app will be developed **not only by you**.
* [ ] The feature set and requirements will **constantly change**.
* [ ] You need to control the quality, retaining the constant development speed.
* [ ] You will have some time to "reshuffle" the components once in a while.
* [ ] There is a possibility to have the **same type of the project** with the same styles and behaviour in the future.

Have you checked 5 of those ticks? 
If yes, then we are on a single track.

## Abstractions
There are only 6 key things you need to use.

### Structural
These abstractions are "building blocks" for all visual things.
* `element`
* `composite`
* `screen`
 
### Behavioral
These abstractions help you to control the behaviour and data flow.
* `state`
* `link`
* `channel`

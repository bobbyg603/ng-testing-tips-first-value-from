![angular-testing-tips-first-value-from](https://user-images.githubusercontent.com/2646053/224515096-ec52023f-a146-48bf-b1dc-5e94a317b86f.png)

# Angular Testing Tips: FirstValueFrom

This repo demonstrates how to use the RxJS helper FirstValueFrom to write better Angular unit tests. A companion article for this repo can be found on Medium.

## Steps 🥾

Clone or fork this repo

```bash
git clone https://github.com/bobbyg603/ng-testing-tips-first-value-from
```

Install the dependencies

```bash
cd ng-testing-tips-first-value-from && npm i 
```

Run the app and the affirmations server

```bash
npm run start
```

Run the tests

```bash
npm test
```

## Examples 🧑‍🏫

Here's a super succinct example of how to use [firstValueFrom](https://rxjs.dev/api/index/function/firstValueFrom) and [expectAsync](https://jasmine.github.io/api/4.5/global.html#expectAsync) to verify a value emitted by an observable.

[affirmations.component.spec.ts](https://github.com/bobbyg603/ng-testing-tips-first-value-from/blob/bca93941c464cf40d6e94d457783c1f214551b51/src/app/affirmations/affirmations.component.spec.ts#L37-L39)
```ts
it('should start with \'Loading...\'', () => 
  expectAsync(firstValueFrom(component.affirmation$)).toBeResolvedTo('Loading...')
);
```

You can test verify a value is emitted by an output by saving the promise returned by firstValueFrom and awaiting it later.

[counter.component.spec.ts](https://github.com/bobbyg603/ng-testing-tips-first-value-from/blob/bca93941c464cf40d6e94d457783c1f214551b51/src/app/counter/counter.component.spec.ts#L25-L35)
```ts
it('should emit updated count', async () => {
  const newCount = 3;
  const resultPromise = firstValueFrom(component.countChange);
  
  component.onCountChange(newCount);
  const result = await resultPromise;

  expect(result).toEqual(newCount);
});
```

We can use [skip](https://rxjs.dev/api/index/function/skip) to verify the next value emitted by an observable.

[counter.component.spec.ts](https://github.com/bobbyg603/ng-testing-tips-first-value-from/blob/bca93941c464cf40d6e94d457783c1f214551b51/src/app/counter/counter.component.spec.ts#L37-L50)
```ts
it('should emit count each time onCountChange is called', async () => {
  const values = [1, 2];
  const firstResultPromise = firstValueFrom(component.countChange);
  const secondResultPromise = firstValueFrom(component.countChange.pipe(skip(1)));

  values.forEach(value => component.onCountChange(value));
  const firstResult = await firstResultPromise;
  const secondResult = await secondResultPromise;

  expect(firstResult).toEqual(values[0]);
  expect(secondResult).toEqual(values[1]);
});
```

A sequence of values emitted by an observable can be captured as an array using [take](https://rxjs.dev/api/operators/take) and [toArray](https://rxjs.dev/api/index/function/toArray).

[counter.component.spec.ts](https://github.com/bobbyg603/ng-testing-tips-first-value-from/blob/bca93941c464cf40d6e94d457783c1f214551b51/src/app/counter/counter.component.spec.ts#L52-L68)
```ts
it('should emit count each time onCountChange is called', async () => {
  const values = [1, 2, 3];
  const resultPromise = firstValueFrom(
    component.countChange
      .pipe(
        take(values.length),
        toArray()
      )
  );
  
  values.forEach(value => component.onCountChange(value));
  const result = await resultPromise;
  
  expect(result).toEqual(jasmine.arrayContaining(values));
});
```

If you found this repo valuable please subscribe to [@bobbyg603 on Medium](https://medium.com/@bobbyg603) for more Angular tips and tricks. 

Thanks for reading! 

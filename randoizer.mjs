/**
 * class Randoizer - Deterministic random integer generator.
 *
 * Generates sequences of random integers based on a seed given to the
 * constructor.  This is useful for games, fractal terrain, fuzz testing,
 * etc.
 *
 * NOTE: This is not intended for, nor should it ever be used for
 * cryptography, passwords, or any security related application.
 *
 * Usage:
 *
 *  import { Randoizer } from "https://fbmstudios.net/randoizer/randoizer.mjs";
 *
 *  // 3 independent random number generators:
 *  const rand      = new Randoizer(23);
 *  const otherRand = new Randoizer(89231);
 *  const clockSeed = new Randoizer();
 *  for(let i = 0; i < 23; i++) {
 *    console.log(`${rand.next()} ${otherRand.next()} ${clockSeed.next()}`);
 *  }
 *
 */

export class Randoizer {
  constructor(seed) {
    if(seed === undefined) {
      seed = Date.now();
    }
    this.reseed(seed);
  }

  /**
   *  Resets the state of the randomizer to the seed passed.
   *
   *  The "seed" can be considered the prior value of next();
   *  as such, reseeding with a prior next() value resets to
   *  that point in the sequence.
   */
  reseed(seed) {
    this.state = BigInt(seed);
  }

  /**
   *  Returns the next integer in the sequence.
   */
  next() {
    // https://en.wikipedia.org/wiki/Linear_congruential_generator
    this.state = (1103515245n * this.state + 12345n) % 2147483648n;
    return Number(this.state);
  }

  /**
   *  Returns a random number >= min and <= max.
   *
   *  Throws an exception on invalid ranges.
   */
  nextInRange(min, max) {
    const rs = max - min + 1;
    if(rs <= 0) {
      throw new Error(
        `invalid range [${min}, ${max}] passed to nextInRange()`
      );
    }

    // ... the % here is suspect....
    // Seems to work though.  shipit.
    return this.next()%rs + min;
  }

  /**
   *  Shuffles the array passed, in place.
   *
   *  Modifies the array passed.
   *
   *  Returns the array.
   */
  knuthShuffle(arr) {
    for(let el = arr.length - 1; el > 0; el--) {
      const swapWith = this.nextInRange(0, el);

      const tmp     = arr[el];
      arr[el]       = arr[swapWith];
      arr[swapWith] = tmp;
    }
    return arr;
  }
}


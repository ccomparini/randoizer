/**
 * class Randoizer - Deterministic random integer generator.
 *
 * Generates sequences of random 32 bit integers based on a seed given to the
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
 *
 *    console.log(`${rand.nexti()} ${otherRand.nextf()} ${clockSeed.nexti()}`);
 *  }
 *
 */

export class Randoizer {
  static #MODULUS = ((1n << 48n) - 1n);  // 48 bits; internal
  static #RESULT_SHIFT = 16n;             // (needs to correspond to MODULUS)
  static #N_MODULUS = Number(Randoizer.#MODULUS)

  constructor(seed) {
    if(seed === undefined) {
      seed = Date.now();
    }
    this.reseed(seed);
  }

  /**
   *  Resets the state of the randomizer to the seed passed.
   *
   *  The "seed" can be considered the prior value of nexti();
   *  as such, reseeding with a prior nexti() value resets to
   *  that point in the sequence.
   */
  reseed(seed) {
    this.state = BigInt(seed);
  }

  /**
   *  Returns the next 32 bit integer in the sequence.
   */
  nexti32() {
    // https://en.wikipedia.org/wiki/Linear_congruential_generator
    this.state = (25214903917n * this.state + 11n) % Randoizer.#MODULUS;
    return Number(this.state>>Randoizer.#RESULT_SHIFT);
  }

  /**
   *  Deprecated - use nexti32() to get the next integer.
   */
  next() {
    return this.nexti32();
  }

  /**
   *  Returns a float in the range (0.0, 1.0).
   *
   *  Note this is inclusive on each end:  1.0 is a possible result.
   */
  nextf() {
    this.nexti32(); // to "move" to the next result
    return Number(this.state) / Randoizer.#N_MODULUS;
  }

  /**
   *  Returns a random integer >= min and <= max.
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
    return this.nexti32()%rs + min;
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


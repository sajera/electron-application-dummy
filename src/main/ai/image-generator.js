// outsource dependencies
import { PNG } from 'pngjs'
import * as tf from '@tensorflow/tfjs'

export class Generator {
  model = null
  size = 100
  dim = 100

  constructor(dim = 100, size = 100) {
    this.size = size
    this.dim = dim

    // --- Build a simple GAN generator ---
    this.model = tf.sequential()
    this.model.add(tf.layers.dense({
      units: 256,
      inputShape: [dim],
      activation: 'relu'
    }))

    this.model.add(tf.layers.dense({
      units: 512,
      activation: 'relu'
    }))

    this.model.add(tf.layers.dense({
      units: size * size * 3,
      activation: 'tanh'
    }))

    this.model.add(tf.layers.reshape({
      targetShape: [size, size, 3]
    }))

  }

  noise = () => tf.randomNormal([1, this.dim])

  // --- Generate an image from random noise ---
  random = async () => this.model
    .predict(this.noise())
    .mul(127.5)
    .add(127.5)
    .cast('int32')

  // Optional: convert tensor to JS array
  async generateArray () {
    const tensor = await this.random()
    const array = tensor.dataSync() // flat array [R,G,B,...]
    tensor.dispose()
    return array
  }

  randomImageDataUrl = async () => {
    const image = this.model.predict(this.noise())
    // NOTE scale from [-1,1] → [0,255]
    const scaled = image.mul(127.5).add(127.5).cast('int32')
    const [h, w, c] = scaled.shape
    const data = await scaled.data()
    const png = new PNG({ width: w, height: h })

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4   // RGBA index
        const srcIdx = (y * w + x) * 3 // RGB index
        png.data[idx] = data[srcIdx]       // R
        png.data[idx + 1] = data[srcIdx+1] // G
        png.data[idx + 2] = data[srcIdx+2] // B
        png.data[idx + 3] = 255            // A
      }
    }

    const buffer = PNG.sync.write(png)
    return `data:image/png;base64,${buffer.toString('base64')}`
  }
}

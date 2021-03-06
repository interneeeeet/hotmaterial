import createRegl from 'regl'
import hotmaterial from '..'

var regl = createRegl()
document.title += ' - regl'

var size = [0, 0]

window.addEventListener('resize', resize)
resize()

var program = hotmaterial(
  require('@internet/hmr!./shader.vert'),
  require('@internet/hmr!./shader.frag')
)

var draw = regl({
  frag: program.frag,
  vert: program.vert,
  attributes: {
    position: [
      -2, 0,
      0, -2,
      2, 2
    ]
  },
  uniforms: {
    time: function (f) {
      return f.time * 0.8
    },
    resolution: function () {
      return size
    }
  },
  depth: {
    enable: false
  },
  count: 3
})

regl.frame(function () {
  regl.clear({
    color: [0, 0, 0, 1]
  })
  draw()
})

function resize () {
  size[0] = window.innerWidth
  size[1] = window.innerHeight
}

// outsource dependencies
import { fabric } from 'fabric'
// local dependencies

const createIconRenderer = img => function (ctx, left, top, styleOverride, fabricObject) {
  ctx.save()
  ctx.translate(left, top)
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle))
  ctx.drawImage(img, -this.cornerSize/2, -this.cornerSize/2, this.cornerSize, this.cornerSize)
  ctx.restore()
}

// NOTE apply custom delete control to all selectable object
const delImg = document.createElement('img')
// NOTE heroicons trash solid
delImg.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2MxMDAwNyIgY2xhc3M9InNpemUtNiI+CiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTYuNSA0LjQ3OHYuMjI3YTQ4LjgxNiA0OC44MTYgMCAwIDEgMy44NzguNTEyLjc1Ljc1IDAgMSAxLS4yNTYgMS40NzhsLS4yMDktLjAzNS0xLjAwNSAxMy4wN2EzIDMgMCAwIDEtMi45OTEgMi43N0g4LjA4NGEzIDMgMCAwIDEtMi45OTEtMi43N0w0LjA4NyA2LjY2bC0uMjA5LjAzNWEuNzUuNzUgMCAwIDEtLjI1Ni0xLjQ3OEE0OC41NjcgNDguNTY3IDAgMCAxIDcuNSA0LjcwNXYtLjIyN2MwLTEuNTY0IDEuMjEzLTIuOSAyLjgxNi0yLjk1MWE1Mi42NjIgNTIuNjYyIDAgMCAxIDMuMzY5IDBjMS42MDMuMDUxIDIuODE1IDEuMzg3IDIuODE1IDIuOTUxWm0tNi4xMzYtMS40NTJhNTEuMTk2IDUxLjE5NiAwIDAgMSAzLjI3MyAwQzE0LjM5IDMuMDUgMTUgMy42ODQgMTUgNC40Nzh2LjExM2E0OS40ODggNDkuNDg4IDAgMCAwLTYgMHYtLjExM2MwLS43OTQuNjA5LTEuNDI4IDEuMzY0LTEuNDUyWm0tLjM1NSA1Ljk0NWEuNzUuNzUgMCAxIDAtMS41LjA1OGwuMzQ3IDlhLjc1Ljc1IDAgMSAwIDEuNDk5LS4wNThsLS4zNDYtOVptNS40OC4wNThhLjc1Ljc1IDAgMSAwLTEuNDk4LS4wNThsLS4zNDcgOWEuNzUuNzUgMCAwIDAgMS41LjA1OGwuMzQ1LTlaIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIC8+Cjwvc3ZnPgo='
fabric.Object.prototype.controls.deleteControl = new fabric.Control({
  x: 0.5, // NOTE Position the control at the top-right corner
  y: -0.5,
  offsetY: -16, // NOTE Adjust its position so it's outside the bounding box
  offsetX: 16,
  cornerSize: 24,
  cursorStyle: 'pointer',
  render: createIconRenderer(delImg),
  mouseUpHandler: (e, { target }) => {
    // NOTE delete
    // console.log(`%c cloneControl.mouseUpHandler ${1} `, 'color: #FF6766; font-weight: bolder;'
    //   , '\n target:', target
    //   , '\n group:', target.toGroup ? target.toGroup() : target
    // )
    const canvas = target.canvas
    canvas.remove(target.toGroup ? target.toGroup() : target)
    canvas.requestRenderAll()
  },
})

// NOTE apply custom delete control to all selectable object
const cloneImg = document.createElement('img')
// NOTE heroicons document-duplicate solid
cloneImg.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzMzMzMzMyIgY2xhc3M9InNpemUtNiI+CiAgPHBhdGggZD0iTTcuNSAzLjM3NWMwLTEuMDM2Ljg0LTEuODc1IDEuODc1LTEuODc1aC4zNzVhMy43NSAzLjc1IDAgMCAxIDMuNzUgMy43NXYxLjg3NUMxMy41IDguMTYxIDE0LjM0IDkgMTUuMzc1IDloMS44NzVBMy43NSAzLjc1IDAgMCAxIDIxIDEyLjc1djMuMzc1QzIxIDE3LjE2IDIwLjE2IDE4IDE5LjEyNSAxOGgtOS43NUExLjg3NSAxLjg3NSAwIDAgMSA3LjUgMTYuMTI1VjMuMzc1WiIgLz4KICA8cGF0aCBkPSJNMTUgNS4yNWE1LjIzIDUuMjMgMCAwIDAtMS4yNzktMy40MzQgOS43NjggOS43NjggMCAwIDEgNi45NjMgNi45NjNBNS4yMyA1LjIzIDAgMCAwIDE3LjI1IDcuNWgtMS44NzVBLjM3NS4zNzUgMCAwIDEgMTUgNy4xMjVWNS4yNVpNNC44NzUgNkg2djEwLjEyNUEzLjM3NSAzLjM3NSAwIDAgMCA5LjM3NSAxOS41SDE2LjV2MS4xMjVjMCAxLjAzNS0uODQgMS44NzUtMS44NzUgMS44NzVoLTkuNzVBMS44NzUgMS44NzUgMCAwIDEgMyAyMC42MjVWNy44NzVDMyA2LjgzOSAzLjg0IDYgNC44NzUgNloiIC8+Cjwvc3ZnPgo='
fabric.Object.prototype.controls.cloneControl = new fabric.Control({
  x: -0.5, // NOTE Position the control at the top-left corner
  y: -0.5,
  offsetY: -16, // NOTE Adjust its position so it's outside the bounding box
  offsetX: -16,
  cornerSize: 24,
  cursorStyle: 'pointer',
  render: createIconRenderer(cloneImg),
  mouseUpHandler: (e, { target }) => target.clone(cloned => {
    // console.log(`%c cloneControl.mouseUpHandler ${1} `, 'color: #FF6766; font-weight: bolder;'
    //   , '\n cloned:', cloned
    // )
    cloned.left += 30
    cloned.top += 30
    target.canvas.add(cloned)
  }),
})

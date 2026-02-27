function CriaCores () {
    Vermelho = Math.round(NúmeroLeds * 0.1)
    if (Vermelho < 1) {
        Vermelho = 1
    }
    Amarelo = Math.round(NúmeroLeds * 0.2)
    if (Amarelo < 1) {
        Amarelo = 1
    }
    Verde = NúmeroLeds - (Vermelho + Amarelo)
    ListaCores = []
    for (let índice = 0; índice <= Verde; índice++) {
        ListaCores.push(neopixel.colors(NeoPixelColors.Green))
    }
    for (let índice = 0; índice <= Amarelo; índice++) {
        ListaCores.push(neopixel.colors(NeoPixelColors.Yellow))
    }
    for (let índice = 0; índice <= Vermelho; índice++) {
        ListaCores.push(neopixel.colors(NeoPixelColors.Red))
    }
}
input.onButtonPressed(Button.A, function () {
    serial.writeValue("Vermelho", Vermelho)
    serial.writeValue("Amarelo", Amarelo)
    serial.writeValue("Verde", Verde)
    for (let índice = 0; índice <= NúmeroLeds; índice++) {
        serial.writeValue(convertToText(índice), ListaCores[índice])
    }
})
function AudioBuffer () {
    NivSom = 0
    if (input.soundLevel() > NívelSomMAx) {
        NívelSomAjust = NívelSomMAx
    } else {
        NívelSomAjust = input.soundLevel()
    }
    for (let index = 0; index < 10; index++) {
        NivSom += NívelSomAjust
    }
    NivSom = NivSom / 10
    NivSom = Math.round(NivSom / NívelSomMAx * NúmeroLeds)
}
let LedsApagados = 0
let NivAnterior = 0
let NívelSomAjust = 0
let NivSom = 0
let ListaCores: number[] = []
let Verde = 0
let Amarelo = 0
let Vermelho = 0
let NúmeroLeds = 0
let NívelSomMAx = 0
NívelSomMAx = 255
NúmeroLeds = 14
let strip = neopixel.create(DigitalPin.P0, NúmeroLeds, NeoPixelMode.RGB)
CriaCores()
basic.forever(function () {
    AudioBuffer()
    if (NivSom < NivAnterior) {
        LedsApagados = NúmeroLeds - (NivAnterior - 1)
        for (let índice = 0; índice <= NúmeroLeds; índice++) {
            strip.setPixelColor(índice + NivSom, neopixel.colors(NeoPixelColors.Black))
        }
    }
    if (NivSom > 1) {
        for (let índice = 0; índice <= NivSom; índice++) {
            strip.setPixelColor(índice, ListaCores[índice])
        }
    }
    strip.show()
    NivAnterior = NivSom
})

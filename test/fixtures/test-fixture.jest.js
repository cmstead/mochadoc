describe('Capitalization', () => {

    test('Capitalizer', function () {
        expect(capitalize('hello')).toBe('Hello')
    })

    const result = [
        ['hello', 'Hello'],
        ['HELLO', 'Hello']
    ].map(t => test(t[0], () => expect(capitalize(t[0])).toBe(t[1])))
})

import { setup } from "xstate";

export const machine = setup({
    types: {
        context: {} as {},
        events: {} as
            | { type: "finish" }
            | { type: "put_cards_into_start_position" }
            | { type: "place_adventure" }
            | { type: "place_fool" }
    },
    schemas: {
        events: {
            finish: {
                type: "object",
                properties: {},
            },
            put_cards_into_start_position: {
                type: "object",
                properties: {},
            },
            place_fool: {
                type: "object",
                properties: {},
            },
        },
    },
}).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QCED2BDAThAdAZQBUBBAJQIGIAHAVwBcB9AYywlnoEsA7W1e2WrA0qpY7Wu1ScA2gAYAuolDDR4yYpAAPRAEYALAHYcAThMn9ugMz6ZNiwDYANCACeiABzac2uz5-7rRub6RgC+IU5oLDgACgCqBPQAwqQAInj0AJIAcgQA8vTRADJEiQCieOQAZlzssAAWsgpIIMpiEpzqWgj6AEwArDh9dj0GPtpuPd7aTq4IunaGMm4WFtoy2iP+fX1hERjYMfFJqenZeQXFZXj4xIkA0vQAYvGxJKVUADbojGD0laioD6NdStVQdZpdXo4OwWPqWJZ9WEyVYzRC9CxeXy+SZGGG7ECRA5xBLJEhpTI5fJFErlG4lB7PAivd4afjoWhgHDoSoczAAChkAEpyITcMTjmTTpSLjTroR6U8Xm9gc1Qe1OogLDI7MYevoNn1tNsjCM3LpUXMjAMseiekY1vofPjRYcSScKedqVc6fdFUy3vQCCQiFkKqyBByuTywPyhSL9mKjqTyWcqZdafLfYzmYHg6GVUoRG01BDEP0Bss3HYDFr9NseiMLQsBroa246zIRnYZDtwgSE66JSnpV7aY9crlCp9vr90BAAG5gbjUTBgAstItgjUIHqdnA9KsGbXwtwmi3LTx9ZYWXRGNweGTosJ9zioCBwdSikGb9WlhAAWn1HAVhWHphlMNw4UcFxEH-HUbAQuxTG0I1bx6Z0B3lMhvxUX9QC6f8egxECLDAu0TEg+Zz08bwbQCIJQj7F1xWTKVPXTPAcOLcF8J0HAEORbw+hsOw4SMAwLV0JYcFvCDjXWfQbwwqIWPdVMZW9TMGSVUouK3P9b34hDVlEkSxL6Jt1mMWjhOrOFYQsZSiSTNSRw4n1tP9UpcxDTjVR-EteLmR9gMsIxO10K9LEbGCEG7Tx7R8WzIssREnMTN1JQ9NNZRwcdJz0vDNDRNxjERbQrF6JD7xWc8tWAkDhJSx19HSwdWOyjTaSIFIADVShyZlCsC4rgqMfduwME1DThPULDqmQGpWJq4RatqBpSYaeNGyDFsokZIurG99UkuxPCWFZ9RWdtLCrZ8QiAA */
    context: {},
    id: "Board",
    initial: "START",
    states: {
        START: {
            on: {
                put_cards_into_start_position: {
                    target: "PUT_CARDS_INTO_PLACES",
                },
            },
        },

        PUT_CARDS_INTO_PLACES: {
            initial: "STACK_FUTURE",
            on: {
                finish: {
                    target: "END",
                }
            },
            states: {
                STACK_FUTURE: {
                    on: {
                        place_fool: {
                            target: "FOOL",
                        },
                    },
                    after: {
                        "0": {
                            target: "STACK_FUTURE_TRANS",
                        },
                    },
                },

                STACK_FUTURE_TRANS: {
                    after: {
                        "0": {
                            target: "STACK_FUTURE",
                        },
                    },
                },

                FOOL: {
                    on: {
                        place_adventure: "ADVENTURE"
                    }
                },

                ADVENTURE: {}
            },
        },

        END: {}
    },
});

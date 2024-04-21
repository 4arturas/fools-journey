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
    /** @xstate-layout N4IgpgJg5mDOIC5QCED2BDAThAdAZQBUBBAJQIGIAHAVwBcB9AYywlnoEsA7W1e2WrA0qpY7Wu1ScA2gAYAuolDDR4yYpAAPRAEYALAHYcAThMn9ugMz6ZNiwDYANCACeiABzac2uz5-7rRub6RgC+IU5oLDgACgCqBPQAwqQAInj0AJIAcgQA8vTRADJEiQCieOQAZlzssAAWsgpIIMpiEpzqWgj6AEwArDh9dj0GPtpuPd7aTq4IunaGMm4WFtoy2iP+fX1hERjYMfFJqenZeQXFZXj4xIkA0vQAYvGxJKVUADbojGD0laioD6NdStVQdZpdXo4OwWPqWJZ9WEyVYzRC9CxeXy+SZGGG7ECRA5xBLJEhpTI5fJFErlG4lB7PAivd4afjoWhgHDoSoczAAChkAEpyITcMTjmTTpSLjTroR6U8Xm9gc1Qe1OogRkYvJMZDCjG43PMLKi5gacMtdNo+jI+v49IF8aLDiSThTztSrnT7oqmW96AQSEQshVWQIOVyeWB+UKRfsxUdSeSzlTLrT5T7GcyA0GQyqlCI2moIZrthaLG47AYLDJ9NseiNTQsBrpq246zIRnZbU74y6JcnpZ7aY9crlCp9vr90BAAG5gbjUTBgfMtQtgjUIHqdnA9SsGPXwtxGHqm5aePrLCy6A0eWs9CxhcIgTioCBwdSikHr9UlhAAWn0TwVhWHphlMNw4UcFxEH-OwcBsGw1mWIYZAMDZeyieUyG-FRf1ALp-wfHAQIsMCeggqCz08bwsX8GRAgMUJn2dcUkylD00zwXCi3BAidAQxDVjsG09ThIwDFNK1PD8XQbVWPptH0VZdEwolEzdFMZS9DMGSVUoeI3P8b0E2xvFEkSbz6Jt1mMWibSrOFYUfFi+zYzShy4709L9Uoc2DbjVR-Yt+LmWsSMsIxOzko0yN0GzPCMezDycxE1ITV1JXdVNZRwUdx0M-DNDRNxjERbQrF6OxbxWM8axIkCbTk0Z9HS-t2Oy7TaSIFIADVShyZlCpC4qwu1MC0OCfprV0HplLqmQGpWJq4X0BY2oGlJhr40bIMWyDZtbIZLHQqS7E8JYViAlZ20sSsnxCIA */
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

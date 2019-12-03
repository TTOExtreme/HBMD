const SysTray = require('systray').default

function exe(Program) {
    const systray = new SysTray({
        menu: {
            // you should using .png icon in macOS/Linux, but .ico format in windows
            icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAAAAACPAi4CAAAAB3RJTUUH1QEHDxEhOnxCRgAAAAlwSFlzAAAK8AAACvABQqw0mAAAAXBJREFUeNrtV0FywzAIxJ3+K/pZyctKXqamji0htEik9qEHc3JkWC2LRPCS6Zh9HIy/AP4FwKf75iHEr6eU6Mt1WzIOFjFL7IFkYBx3zWBVkkeXAUCXwl1tvz2qdBLfJrzK7ixNUmVdTIAB8PMtxHgAsFNNkoExRKA+HocriOQAiC+1kShhACwSRGAEwPP96zYIoE8Pmph9qEWWKcCWRAfA/mkfJ0F6dSoA8KW3CRhn3ZHcW2is9VOsAgoqHblncAsyaCgcbqpUZQnWoGTcp/AnuwCoOUjhIvCvN59UBeoPZ/AYyLm3cWVAjxhpqREVaP0974iVwH51d4AVNaSC8TRNNYDQEFdlzDW9ob10YlvGQm0mQ+elSpcCCBtDgQD7cDFojdx7NIeHJkqi96cOGNkfZOroZsHtlPYoR7TOp3Vmfa5+49uoSSRyjfvc0A1kLx4KC6sNSeDieD1AWhrJLe0y+uy7b9GjP83l+m68AJ72AwSRPN5g7uwUAAAAAElFTkSuQmCC",
            title: "HBMD HeartBeat Module",
            tooltip: "Tips",
            items: [{
                title: "Log",
                tooltip: "Open Log",
                // checked is implement by plain text in linux
                checked: false,
                enabled: true
            }, {
                title: "Exit",
                tooltip: "bb",
                checked: false,
                enabled: true
            }]
        },
        debug: false,
        copyDir: true, // copy go tray binary to outside directory, useful for packing tool like pkg.
    })

    function getCommandLine() {
        switch (process.platform) {
            case 'darwin': return 'open';
            case 'win32': return 'start';
            case 'win64': return 'start';
            default: return 'xdg-open';
        }
    }

    systray.onClick(action => {
        if (action.seq_id === 0) {

            var exec = require('child_process').exec;
            exec(getCommandLine() + ' ' + filePath);

        } else if (action.seq_id === 1) {
            systray.kill()
        }
    })
}

module.exports = exe;
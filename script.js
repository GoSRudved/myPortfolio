(function () {
    var PLAY_ONCE_PER_SESSION = false;

    try {
        if (PLAY_ONCE_PER_SESSION && sessionStorage.getItem("booted")) return;
    } catch (e) { }
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var lines = [
        { text: "booting GoS_Rudved.portfolio ..." },
        { text: "loading assets", ok: true },
        { text: "bypassing localized firewall protocols...", ok: true },
        { text: "compiling creativity", ok: true },
        { text: "tracking cookies and ambient digital footprints", ok: true },
        { text: "initializing interface", ok: true },
        { text: "welcome, visitor.", cls: "boot-accent", pause: 400 }
    ];

    var root = document.documentElement;
    var screen = document.createElement("div");
    screen.id = "boot-screen";
    screen.setAttribute("aria-hidden", "true");
    screen.innerHTML =
        '<div class="boot-terminal" id="boot-lines"></div>' +
        '<button type="button" class="boot-skip">skip &rsaquo;</button>';
    document.body.insertBefore(screen, document.body.firstChild);
    root.classList.add("booting");              // locks scrolling while it plays (idk abt this one)

    var out = screen.querySelector("#boot-lines");
    var finished = false;

    function finish() {
        if (finished) return;
        finished = true;
        screen.classList.add("boot-hide");       // fades out (updated)
        setTimeout(function () {
            screen.remove();
            root.classList.remove("booting");
        }, 700);
        try { sessionStorage.setItem("booted", "1"); } catch (e) { }
    }

    function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

    async function run() {
        await sleep(300);
        for (var i = 0; i < lines.length; i++) {
            var l = lines[i];
            var row = document.createElement("div");
            row.className = "boot-line " + (l.cls || "");
            var prompt = document.createElement("span");
            prompt.className = "boot-prompt";
            prompt.textContent = "> ";
            var txt = document.createElement("span");
            row.appendChild(prompt);
            row.appendChild(txt);
            out.appendChild(row);

            for (var c = 0; c < l.text.length; c++) {
                if (finished) return;
                txt.textContent += l.text.charAt(c);
                await sleep(12 + Math.random() * 16);
            }
            if (l.ok) {
                var ok = document.createElement("span");
                ok.className = "boot-ok";
                ok.textContent = "  [ OK ]";
                row.appendChild(ok);
            }
            await sleep(l.pause || 220);
        }
        await sleep(450);
        finish();
    }

    screen.addEventListener("click", finish);
    document.addEventListener("keydown", finish, { once: true });
    run();
})();
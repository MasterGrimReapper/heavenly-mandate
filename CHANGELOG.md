# Heavenly Mandate — v0.049 changelog

**The desktop review: tests, fairer bots, a clearer surrender and a sturdier desktop app.**

1. Automated tests ship with the desktop package: `npm test` checks every script, the content (16 heroes, real items in every build, all 59 Steam achievements), replays in all five modes (same final state and same event sequence), and simulation invariants (health, gold, cooldowns, respawn limits, match endings)
2. A seeded simulation batch runner and summary (`npm run sim`, `tests/summarize.js`) report match length percentiles, first blood and first tower, side balance, income by lane, bot play styles and hero win rates with 95% intervals. REVIEW.md now holds current results instead of v0.041/v0.042 data
3. Bots respect pagoda range when chasing: allies and easier enemies no longer follow a fleeing hero under an untanked tower, and diving needs a nearly dead target, spare health and a teammate close by. Celestial and Mythic enemies still take calculated risks
4. Laners hold their lane through the early game instead of drifting to distant bosses (objective-minded bots still go)
5. Lane economy: soldiers pay 2 more gold, the laner assigned to a lane collects the shared gold from further away, a soldier lost to a pagoda pays nearby heroes a bigger share, and jungle camps pay less and respawn after 125 s instead of 100 s
6. Surrender is now a visible vote: allies answer one by one, you can cancel it, it needs 4 of 5, and a failed or cancelled vote locks voting for a while. The first click's confirmation expires after 4 seconds. Surrenders are recorded, so replays end the same way
7. The death recap always names the final blow, even when no damage was recorded
8. Routine banners no longer stack up: a repeat within 25 seconds, or a small banner queued behind two others, goes to the kill feed
9. While dead on desktop, arrow keys and edge panning look around and the Center key follows your ally again; on phones a Follow button appears in the death bar
10. Desktop display modes: Fullscreen, Borderless and Windowed. The window remembers its size, position and monitor
11. Menus and the HUD scale up on 1440p, 4K and ultrawide screens; the main menu and shop fit a 1024×640 window
12. Settings are checked on load: a damaged settings file is set aside and defaults are used, wrong types and out-of-range values are repaired, and keys reserved for items, the scoreboard, fullscreen and the controls card can no longer be bound
13. Achievements unlocked during a match now reach Steam (they only did at the end before)
14. Steam readiness: `npm run release-check` lists what still blocks a public release (the test App ID 480, achievement icons, versions, Electron security), and 118 achievement icons (locked and unlocked, 256×256) are in build/achievements
15. The post-match coach has a button to practise its suggestion: the last-hit drill, the training dummy, replays, Bridge Battle or Celestial Rush
16. Mode cards show match lengths measured from simulated matches (Three Realms 12–21 min, Celestial Rush 8–15, Bridge 6–15, King of the River 5–8, Duel 5–12)
17. Windows builds can be made as a portable zip from any computer (`npm run dist:zip`), with the game's icon and version on the .exe
18. Replays from earlier versions are flagged as incompatible (simulation version 44)

---

# Heavenly Mandate — v0.048 changelog

**The game has a home on GitHub.**

1. Heavenly Mandate now has a public page with the game's description, heroes, modes, screenshots and changelog: github.com/MasterGrimReapper/heavenly-mandate
2. The Android app now downloads updates from that page; from this version on, new versions are offered in the game automatically

---

# Heavenly Mandate — v0.047 changelog

**Updates inside the Android app.**

1. The Android app checks for a new version each time it starts (and from Settings › Gameplay › App updates › Check now)
2. When an update is out, a window shows the new version, its size and what changed, with Download and update or Later; if you are in a match it waits until you are back at the menu
3. The update downloads inside the game with a progress bar, is checked to be a genuine newer Heavenly Mandate build, then Android's installer opens: tap Install, then Open
4. The first time, Android asks you to allow installs from Heavenly Mandate; turn it on and come back, and the installer opens by itself
5. Your level, coins, unlocks, replays and settings are kept, and the game saves just before the installer opens
6. Shop item descriptions on touch screens say tap instead of click

---

# Heavenly Mandate — v0.046 changelog

**A new opening, a map for every mode, and a cleaner phone screen.**

1. New startup film: a drop of ink falls on rice paper and blooms open onto a night sky, the jade and crimson dragons spiral in to chase the Pearl of the Mandate, lightning gathers, the pearl bursts and the title is stamped with a red seal. The title screen now shows the twin dragons circling the logo
2. Bridge Battle and Duel are fought on a single bridge over a sea of clouds, with railings, lanterns, a central gate and snow-capped peaks below
3. King of the River is a round arena with a stone control-point plaza in the middle; its flag takes the holding team's colour. First to 300 (was 240) wins
4. Gates of Life are smaller (healing ring now matches the circle) and guarded by two dragons chasing a pearl; the inner circle is where you respawn
5. Team respawn timers: the first death on a team respawns in 8 seconds and every death on that team, yours or a teammate's, adds 2 seconds, up to 60
6. Music no longer stutters during heavy fights: the score is queued further ahead, the scheduler resumes a suspended audio context, and very busy moments drop extra sound effects instead of stalling
7. Phones: every Chinese glyph in menus, hero select, draft, buffs, objectives, pings, emotes and banners is now an icon or plain English; keyboard keys are gone from hero select and tooltips
8. Phones: hero select and draft show portraits, ability icons and the battle spell's description
9. Phones: name and health bars are about a third smaller so you can see your opponent; floating glyphs read "Takedown!" and "Level up!"
10. Phones: dying shows a slim top bar (respawn timer, killer, who you are watching) with arrows to switch ally and a Recap button. Drag to look around and pinch to zoom while dead. Desktop: arrow keys and edge panning work while dead
11. Phones: smaller banners and toasts, coach tips stay hidden while you are dead, the Practice panel is folded by default and boss timers show under the score
12. Phones: holding an ability highlights the target a plain tap would hit and warns when it is out of range; the attack button explains when nothing is within reach
13. New touch settings (Settings › Controls): Instant casting, button opacity, interface size, bold team rings, vibration and the controls guide
14. Post-match coach: your strongest contribution, one thing to improve and a concrete way to practise it
15. Bots have play styles (aggressive, careful, objective-focused, farmer), shown on the scoreboard
16. Shop: "Counters for this enemy team" suggests armor, resist, anti-healing or tenacity items based on who you are fighting; every purchase shows the stats you gained
17. Supports see a pulsing SAVE! marker over a nearby ally who is low and under attack
18. Draft adviser: warns when your team has no frontline, support or ranged damage, and tells you when your pick fills the gap
19. Practice Grounds: Infinite Qi toggle and a live damage-per-second meter for the training dummy
20. Progress is saved whenever the app is backgrounded or closed; Settings and the Android README explain that clearing app data erases local progress unless you export a backup
21. Fixes: the menu hero count comes from the roster (16), and the team-gold calculation no longer carries a dead item term
22. Replays recorded on earlier versions are flagged as incompatible (simulation version 43)

---

# Heavenly Mandate — v0.045 changelog

**A cleaner phone screen.**

1. Every touch ability button shows a picture of what it does, drawn from the ability itself: strike, shot, piercing shot, volley, spin, slam, field, dash, blink, power up, aura, transform, shield, heal, protect allies or wall of fire
2. A small badge on each ability shows its crowd control or side effect: stun, knock-up, root, pull, slow, shield, heal or burn
3. Battle spells, troops, attack, recall, shop, ping, emote, scoreboard, pause, the spirit lantern and every item have their own pictograms on touch screens
4. The phone screen is reorganised: map, gold and Shop, and Recall in one column on the left; ping, emote, scoreboard and pause in one row at the top right; portrait, level, buffs, health, Qi and items in one dock at the bottom; abilities in an arc around the attack button
5. The ultimate has a gold ring, the battle spell and troops are labelled, and a soft shadow groups the ability arc
6. Controls guide: numbered markers on every control with a legend of what each does, shown in your first touch match and from Pause › Touch controls
7. Hold any ability, spell or troop button to read what it does; let go to close it without casting, or drag to aim it anyway
8. On touch screens abilities fire when you lift your finger, so you can still cancel by sliding back onto the button
9. Tap a buff to read what it is
10. The in-match shop uses the same item pictograms on touch screens
11. Tips, tooltips and How to Play no longer mention keyboard keys or Chinese button glyphs on touch screens
12. The kill feed shows at most two lines on phones and no longer covers the abilities, and coach tips sit clear of it
13. The bottom dock moves left on narrow phones so it never overlaps the ability arc

---


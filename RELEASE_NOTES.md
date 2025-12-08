# Release Notes: v0.0.15

## 🐛 Bug Fix Release

This release fixes an issue with child ordering in RTL mode.

## ✨ What's Fixed

### RTL Children Order Fix

**Issue**: In RTL mode, children arrays were being reversed, causing inconsistent behavior when accessing children by index.

**Fix**: 
- Removed automatic reversal of row children in RTL mode
- Removed automatic reversal of tab children in RTL mode
- Children now maintain their original order regardless of direction
- CSS `flex-direction: row-reverse` still applies for visual RTL layout, but array order is preserved

**Impact**: 
- Consistent behavior when accessing children by index
- Predictable layout structure regardless of direction
- Better alignment with expected behavior

## 📝 Technical Details

### Before
- RTL mode: `childrenToRender = [...rowChildren].reverse()`
- Tabs: `tabsToRender = direction === "rtl" ? [...tabs].reverse() : tabs`
- Complex index calculations to map between reversed and original indices

### After
- RTL mode: `childrenToRender = rowChildren` (no reversal)
- Tabs: `tabsToRender = tabs` (no reversal)
- Simplified rendering logic
- CSS handles visual RTL layout via `flex-direction: row-reverse`

## 🔄 Migration

**No migration needed!** This is a bug fix that improves consistency.

If you were relying on reversed children order in RTL mode, you may need to adjust your code. However, this change makes the behavior more predictable and consistent.

## 🧪 Testing

- ✅ All existing tests passing
- ✅ RTL mode tested and verified
- ✅ Backward compatible (no breaking API changes)

## 📚 Documentation

- See `CHANGELOG.md` for detailed changes

---

**Ready to release!** 🎉

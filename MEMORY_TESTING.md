# Memory Management Testing Guide

This guide explains how to test memory management in `layout-manager-react` to ensure there are no memory leaks.

## Browser DevTools - Memory Profiler

### Chrome/Edge DevTools

1. **Open DevTools** (F12)
2. **Go to Memory tab**
3. **Take Heap Snapshots**:
   - Click "Take heap snapshot"
   - Interact with the layout (add/remove tabs, drag & drop, resize)
   - Take another snapshot
   - Compare snapshots to check for memory growth

4. **Monitor Memory Timeline**:
   - Use "Allocation timeline" to see memory allocation over time
   - Interact with the layout for several minutes
   - Check if memory keeps growing (indicates leaks)

### What to Look For:

- **Growing DOM nodes**: Number of DOM nodes should stabilize
- **Event listeners**: Should not accumulate
- **Detached DOM trees**: Should be minimal (indicates leaks)
- **Closure references**: Should not grow indefinitely

## Testing Memory Leaks

### 1. Test Event Listeners Cleanup

```javascript
// In browser console
let initialListeners = getEventListeners(document);
// Interact with layout: add/remove tabs, drag & drop
// Wait a few seconds
let finalListeners = getEventListeners(document);
// Compare - should not have excessive growth
```

### 2. Test ResizeObserver Cleanup

```javascript
// Check ResizeObserver instances
// In DevTools Console:
performance.memory
// Monitor heap size before and after component unmount
```

### 3. Test Storage Timeouts

```javascript
// Check for orphaned timeouts
// In DevTools Console:
// Interact with layout rapidly (triggers debounced saves)
// Check if timeouts are cleared properly
```

## Automated Testing

### Using Playwright/E2E Tests

Create a test file to check for memory leaks:

```typescript
// __test__/e2e/memory.spec.ts
import { test, expect } from '@playwright/test';

test('should not leak memory when adding/removing tabs', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Get initial memory
  const initialMemory = await page.evaluate(() => {
    return (performance as any).memory?.usedJSHeapSize || 0;
  });
  
  // Add and remove tabs multiple times
  for (let i = 0; i < 50; i++) {
    // Add tab
    await page.click('[data-testid="add-tab"]');
    await page.waitForTimeout(100);
    
    // Remove tab
    await page.click('[data-testid="close-tab"]');
    await page.waitForTimeout(100);
  }
  
  // Force garbage collection (if available)
  await page.evaluate(() => {
    if ((window as any).gc) {
      (window as any).gc();
    }
  });
  
  await page.waitForTimeout(1000);
  
  // Get final memory
  const finalMemory = await page.evaluate(() => {
    return (performance as any).memory?.usedJSHeapSize || 0;
  });
  
  // Memory should not grow excessively (allow 10% growth for GC delays)
  const memoryGrowth = (finalMemory - initialMemory) / initialMemory;
  expect(memoryGrowth).toBeLessThan(0.1);
});
```

### Using React Testing Library

```typescript
// __test__/src/components/Memory.test.tsx
import { render, unmount } from '@testing-library/react';
import { Layout, createLayoutModel, createTabSet, createTab } from '../../src';

describe('Memory Management', () => {
  it('should cleanup event listeners on unmount', () => {
    const model = createLayoutModel(
      createTabSet('tabset1', [createTab('tab1', 'comp1', 'Tab 1')])
    );
    
    const factory = () => <div>Content</div>;
    
    const { unmount } = render(
      <Layout model={model} factory={factory} />
    );
    
    // Get initial listener count
    const initialListeners = document.querySelectorAll('*').length;
    
    // Unmount
    unmount();
    
    // Wait for cleanup
    setTimeout(() => {
      // Check that listeners are cleaned up
      // (This is a simplified check - actual implementation may vary)
    }, 100);
  });
  
  it('should cleanup ResizeObserver on unmount', () => {
    const model = createLayoutModel(
      createTabSet('tabset1', [createTab('tab1', 'comp1', 'Tab 1')])
    );
    
    const factory = () => <div>Content</div>;
    
    const { unmount } = render(
      <Layout model={model} factory={factory} />
    );
    
    // Unmount and verify cleanup
    unmount();
    
    // ResizeObserver should be disconnected
    // (Check implementation-specific cleanup)
  });
});
```

## Manual Testing Checklist

### 1. Component Mount/Unmount
- [ ] Mount layout component
- [ ] Unmount component
- [ ] Check DevTools Memory tab for detached nodes
- [ ] Verify no event listeners remain

### 2. Tab Operations
- [ ] Add 100 tabs
- [ ] Remove all tabs
- [ ] Check memory returns to baseline
- [ ] Verify no orphaned DOM nodes

### 3. Drag & Drop
- [ ] Perform 50+ drag & drop operations
- [ ] Check for memory growth
- [ ] Verify event listeners are cleaned up

### 4. Resize Operations
- [ ] Resize tabsets 100+ times
- [ ] Check for memory leaks
- [ ] Verify ResizeObserver cleanup

### 5. Storage Operations
- [ ] Enable storage
- [ ] Make 100+ layout changes rapidly
- [ ] Check for orphaned timeouts
- [ ] Verify debounced saves complete

### 6. Long-Running Test
- [ ] Leave layout open for 30+ minutes
- [ ] Interact periodically
- [ ] Monitor memory over time
- [ ] Should stabilize, not grow continuously

## Chrome DevTools Memory Profiling Steps

1. **Open DevTools** → **Memory** tab
2. **Select "Heap snapshot"**
3. **Take snapshot** (baseline)
4. **Interact with layout** (add/remove tabs, drag, resize)
5. **Take snapshot** (after interaction)
6. **Compare snapshots**:
   - Look for growing object counts
   - Check for detached DOM trees
   - Verify event listener cleanup

7. **Use "Allocation timeline"**:
   - Start recording
   - Interact with layout
   - Stop recording
   - Check for continuous memory growth

## Key Metrics to Monitor

1. **Heap Size**: Should stabilize after initial load
2. **DOM Nodes**: Should not grow indefinitely
3. **Event Listeners**: Should be cleaned up on unmount
4. **Detached Nodes**: Should be minimal (indicates leaks)
5. **Closure Count**: Should not grow with interactions

## Common Memory Leak Patterns to Check

1. **Event Listeners Not Removed**
   ```javascript
   // BAD
   window.addEventListener('resize', handler);
   // No cleanup
   
   // GOOD
   useEffect(() => {
     window.addEventListener('resize', handler);
     return () => window.removeEventListener('resize', handler);
   }, []);
   ```

2. **Timeouts Not Cleared**
   ```javascript
   // BAD
   setTimeout(() => {}, 1000);
   // No clearTimeout
   
   // GOOD
   useEffect(() => {
     const timeout = setTimeout(() => {}, 1000);
     return () => clearTimeout(timeout);
   }, []);
   ```

3. **Observers Not Disconnected**
   ```javascript
   // BAD
   const observer = new ResizeObserver(callback);
   observer.observe(element);
   // No disconnect
   
   // GOOD
   useEffect(() => {
     const observer = new ResizeObserver(callback);
     observer.observe(element);
     return () => observer.disconnect();
   }, []);
   ```

## Performance Monitoring

### Using Performance API

```javascript
// Monitor memory usage
const memoryInfo = performance.memory;
console.log({
  usedJSHeapSize: memoryInfo.usedJSHeapSize,
  totalJSHeapSize: memoryInfo.totalJSHeapSize,
  jsHeapSizeLimit: memoryInfo.jsHeapSizeLimit
});

// Monitor over time
setInterval(() => {
  const memory = performance.memory;
  console.log('Memory:', {
    used: (memory.usedJSHeapSize / 1024 / 1024).toFixed(2) + ' MB',
    total: (memory.totalJSHeapSize / 1024 / 1024).toFixed(2) + ' MB'
  });
}, 1000);
```

## Expected Results

✅ **Good Memory Management**:
- Memory stabilizes after initial load
- No continuous growth during interactions
- Cleanup happens on unmount
- No detached DOM trees
- Event listeners removed properly

❌ **Memory Leaks**:
- Continuous memory growth
- Growing number of DOM nodes
- Detached DOM trees accumulating
- Event listeners not removed
- Timeouts/or observers not cleaned up

## Tools

1. **Chrome DevTools Memory Profiler**
2. **React DevTools Profiler** (for React-specific leaks)
3. **Lighthouse** (performance audit)
4. **WebPageTest** (memory over time)
5. **Playwright** (automated memory testing)

## Quick Test Script

Run this in browser console on the demo page:

```javascript
// Quick memory leak test
async function testMemoryLeaks() {
  const initialMemory = performance.memory?.usedJSHeapSize || 0;
  console.log('Initial memory:', (initialMemory / 1024 / 1024).toFixed(2), 'MB');
  
  // Simulate heavy usage
  for (let i = 0; i < 100; i++) {
    // Trigger tab operations, drag & drop, resize
    // (Adjust based on your demo's available actions)
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  // Force GC if available
  if (window.gc) window.gc();
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const finalMemory = performance.memory?.usedJSHeapSize || 0;
  console.log('Final memory:', (finalMemory / 1024 / 1024).toFixed(2), 'MB');
  
  const growth = ((finalMemory - initialMemory) / initialMemory * 100).toFixed(2);
  console.log('Memory growth:', growth + '%');
  
  if (growth > 20) {
    console.warn('⚠️ Potential memory leak detected!');
  } else {
    console.log('✅ Memory management looks good');
  }
}

testMemoryLeaks();
```


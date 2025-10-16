# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a site survey report automation system for Graf Depot (グラフデポ様). The project focuses on digitizing and streamlining the field survey reporting workflow by automating photo location mapping and report generation.

## System Components

### 1. Mobile Application (React Native + TypeScript)
- **Location**: `phase1-mvp/mobile-app/` and `phase2-full/mobile-app/`
- **Purpose**: Field surveyors use this to capture photos with automatic GPS and compass data
- **Key Features**:
  - Phase 1: GPS/compass auto-recording, photo capture, cloud upload
  - Phase 2: AR guidance, voice memos, photo checklist

### 2. Web Admin System (React + TypeScript)
- **Location**: `phase1-mvp/web-admin/` and `phase2-full/web-admin/`
- **Purpose**: HQ staff use this to generate reports from uploaded photos
- **Key Features**:
  - Phase 1: Auto-plot photos on map, manual adjustments, PDF export
  - Phase 2: AI image analysis, auto-labeling, Excel export, analytics

## Project Context

### Client Documents
- **Proposal**: `grafdepot_dx_proposal_20251013133625.pdf` - Contains the DX proposal and project requirements
- **Sample Files** (in `グラフデポ様からのサンプルファイル/`):
  - Survey report samples: `サンプル1.pdf`, `サンプル２.pdf` - Show manual annotation process
  - Survey report template: `報告書サンプル.xlsx` - Excel format to replicate
  - Map files: `広域図.pdf` (area map), `詳細図.pdf` (detailed map)

### Key Pain Points Being Solved
1. **Manual location matching**: Currently takes hours of "puzzle-solving" work to match photos to locations
2. **Manual map annotation**: Staff manually draw arrows and numbers on maps
3. **Inconsistent quality**: Depends on surveyor's memo quality
4. **Heavy workload**: HQ staff experience long hours and mental burden

### Critical Requirements
- Automatic GPS coordinate capture during photo taking
- Automatic compass direction recording
- Auto-plotting photos on map with numbered markers
- Auto-drawing direction arrows based on compass data
- Drag-and-drop adjustment for GPS inaccuracies
- PDF/Excel report generation matching existing format

## Development Setup

### Current Status
- ✅ Specifications document created
- ✅ Design policy defined
- ✅ Coding standards established
- ✅ Interactive HTML/CSS mockups created for both phases
- ⏳ Ready for React Native + React implementation

### Viewing Mockups
```bash
# Mobile App - Phase 1 MVP
open phase1-mvp/mobile-app/index.html

# Mobile App - Phase 2 Full
open phase2-full/mobile-app/index.html

# Web Admin - Phase 1 MVP
open phase1-mvp/web-admin/index.html

# Web Admin - Phase 2 Full
open phase2-full/web-admin/index.html
```

## Architecture Guidance

### Phase 1 (MVP) - 3-4 months
Focus on core automation:
1. **Mobile**: GPS + compass auto-recording, basic camera, cloud sync
2. **Web**: Map with auto-plotted markers and arrows, drag-to-adjust, PDF export
3. **Backend**: Photo storage, GPS/compass data handling, basic auth

### Phase 2 (Full System) - 5-6 months
Add AI and automation:
1. **Mobile**: AR guidance, checklist, voice memos, push notifications
2. **Web**: AI image enhancement, auto-labeling, Excel export, analytics dashboard
3. **Backend**: AI image processing, template engine, data analytics

## Design Guidelines

### Colors
- **Primary Blue**: #005BAC (headers, buttons, active states)
- **Secondary Yellow**: #FFC400 (action buttons, highlights)
- **Success Green**: #4CAF50
- **Error Red**: #F44336
- **Warning Orange**: #FF9800

### Typography
- System fonts (Hiragino Kaku Gothic ProN for Japanese)
- H1: 24px (mobile) / 32px (web)
- Body: 16px
- Small: 12-14px

### Key UI Patterns
- Map markers: Blue circles with white numbers
- Direction arrows: Yellow arrows pointing in compass direction
- Phase badges: Phase 1 = Blue, Phase 2 = Orange
- Status badges: Pending/In Progress/Complete with appropriate colors

## File Organization

```
現地調査報告業務/
├── docs/                          # All documentation
│   ├── specifications/            # System specs with phase breakdown
│   ├── design-policy/             # UI/UX guidelines
│   └── coding-standards/          # TypeScript, React rules
├── phase1-mvp/                    # MVP implementation
│   ├── mobile-app/                # React Native app
│   └── web-admin/                 # React web dashboard
├── phase2-full/                   # Full system implementation
│   ├── mobile-app/                # Enhanced mobile features
│   └── web-admin/                 # AI-powered web features
├── shared/                        # Common code/assets
└── グラフデポ様からのサンプルファイル/ # Client reference materials
```

## Development Commands (When Implemented)

### Mobile App
```bash
cd phase1-mvp/mobile-app
npm install
npm start                  # Start Metro bundler
npm run ios               # Run on iOS simulator
npm run android           # Run on Android emulator
```

### Web Admin
```bash
cd phase1-mvp/web-admin
npm install
npm start                 # Start dev server
npm run build            # Production build
```

### Backend API
```bash
cd backend
npm install
npm run dev              # Start with hot reload
npm test                 # Run tests
```

## Testing Strategy

### Phase 1 Focus
- GPS accuracy in various locations
- Photo upload reliability on poor network
- Map marker positioning accuracy
- PDF export formatting

### Phase 2 Focus
- AI image analysis accuracy
- Auto-labeling correctness
- Excel template compatibility
- Analytics data accuracy

## References

- Full specs: `docs/specifications/システム仕様書.md`
- Design guide: `docs/design-policy/デザインポリシー.md`
- Code standards: `docs/coding-standards/コーディング規約.md`
- Project overview: `README.md`

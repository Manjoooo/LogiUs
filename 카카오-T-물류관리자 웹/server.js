import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-Memory Storage for Kakao T Freight Data
let dispatches = [
  {
    id: 'DISP-2026-8901',
    shipper: '(주)CJ대한통운 이천물류센터',
    pickUp: '경기 이천시 대월면 물류로 124',
    dropOff: '부산 사하구 감천항로 88',
    cargoType: '전자부품 12파렛트 (윙바디)',
    tonnage: '11톤 윙바디',
    weightTon: 8.5,
    fee: 450000,
    status: 'DISPATCHED', // SEARCHING, DISPATCHED, DOCKING, LOADING, IN_TRANSIT, COMPLETED
    driverName: '김철수',
    driverPhone: '010-8923-1102',
    truckPlate: '경기 88바 1234',
    dockingBay: 'Bay 03 (이천 B동)',
    requestedTime: '2026-08-13 09:00',
    distanceKm: 345,
    urgent: true,
    tCheckStatus: 'PASSED', // PENDING, PASSED, FAILED
    createdAt: new Date().toISOString()
  },
  {
    id: 'DISP-2026-8902',
    shipper: '삼성SDI 평택 사업장',
    pickUp: '경기 평택시 포승읍 평택항로 45',
    dropOff: '충남 아산시 탕정면 디스플레이로 1',
    cargoType: '배터리 모듈 (정밀진동 방지)',
    tonnage: '5톤 무진동',
    weightTon: 4.2,
    fee: 280000,
    status: 'DOCKING',
    driverName: '박성호',
    driverPhone: '010-4491-7712',
    truckPlate: '충남 80아 5678',
    dockingBay: 'Bay 01 (평택 A동)',
    requestedTime: '2026-08-13 10:30',
    distanceKm: 62,
    urgent: false,
    tCheckStatus: 'IN_PROGRESS',
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'DISP-2026-8903',
    shipper: '쿠팡 용인2물류센터',
    pickUp: '경기 용인시 처인구 남사읍',
    dropOff: '광주 북구 첨단연신로 110',
    cargoType: '생필품 및 박스화물',
    tonnage: '25톤 트레일러',
    weightTon: 18.0,
    fee: 620000,
    status: 'SEARCHING',
    driverName: null,
    driverPhone: null,
    truckPlate: null,
    dockingBay: null,
    requestedTime: '2026-08-13 13:00',
    distanceKm: 278,
    urgent: true,
    tCheckStatus: 'PENDING',
    createdAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'DISP-2026-8904',
    shipper: '현대글로비스 의왕ICD',
    pickUp: '경기 의왕시 오봉로 175',
    dropOff: '경남 창원시 성산구 공단로',
    cargoType: '자동차 기계부품',
    tonnage: '11톤 카고',
    weightTon: 9.8,
    fee: 490000,
    status: 'IN_TRANSIT',
    driverName: '이동현',
    driverPhone: '010-3321-9081',
    truckPlate: '경남 91가 2345',
    dockingBay: 'Bay 05 (의왕 1터미널)',
    requestedTime: '2026-08-13 07:00',
    distanceKm: 310,
    urgent: false,
    tCheckStatus: 'PASSED',
    createdAt: new Date(Date.now() - 14400000).toISOString()
  },
  {
    id: 'DISP-2026-8905',
    shipper: 'LG에너지솔루션 오창',
    pickUp: '충북 청주시 청원구 오창읍',
    dropOff: '인천 서구 가좌동 물류단지',
    cargoType: '양극재 용기 8톤',
    tonnage: '8톤 윙바디',
    weightTon: 7.5,
    fee: 320000,
    status: 'COMPLETED',
    driverName: '정재훈',
    driverPhone: '010-5561-2234',
    truckPlate: '인천 85사 9876',
    dockingBay: 'Bay 02 (오창 3공장)',
    requestedTime: '2026-08-12 16:00',
    distanceKm: 142,
    urgent: false,
    tCheckStatus: 'PASSED',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

let geofenceZones = [
  { id: 'geo-1', name: '평택항 국제물류터미널', lat: 36.965, lng: 126.852, radiusMeter: 1200, activeTrucks: 14, status: 'NORMAL' },
  { id: 'geo-2', name: '이천 CJ 허브센터', lat: 37.218, lng: 127.481, radiusMeter: 800, activeTrucks: 22, status: 'CONGESTED' },
  { id: 'geo-3', name: '의왕 ICD 제1터미널', lat: 37.331, lng: 126.974, radiusMeter: 1000, activeTrucks: 18, status: 'NORMAL' },
  { id: 'geo-4', name: '인천항 배후물류단지', lat: 37.442, lng: 126.611, radiusMeter: 1500, activeTrucks: 31, status: 'BUSY' },
  { id: 'geo-5', name: '부산 신항 컨테이너야드', lat: 35.080, lng: 128.825, radiusMeter: 2000, activeTrucks: 45, status: 'NORMAL' }
];

let dockingBays = [
  { bayNo: 'Bay 01', zone: '평택 센터 A동', truckPlate: '충남 80아 5678', driver: '박성호', cargo: '배터리 모듈', status: 'DOCKING', weightOk: true, sealOk: true, tireOk: true, progress: 65 },
  { bayNo: 'Bay 02', zone: '평택 센터 A동', truckPlate: 'EMPTY', driver: '-', cargo: '-', status: 'VACANT', weightOk: true, sealOk: true, tireOk: true, progress: 0 },
  { bayNo: 'Bay 03', zone: '이천 B동', truckPlate: '경기 88바 1234', driver: '김철수', cargo: '전자부품 12파렛트', status: 'INSPECTION', weightOk: true, sealOk: false, tireOk: true, progress: 40 },
  { bayNo: 'Bay 04', zone: '이천 B동', truckPlate: 'EMPTY', driver: '-', cargo: '-', status: 'VACANT', weightOk: true, sealOk: true, tireOk: true, progress: 0 },
  { bayNo: 'Bay 05', zone: '의왕 1터미널', truckPlate: '경남 91가 2345', driver: '이동현', cargo: '자동차 부품', status: 'LOADING_COMPLETE', weightOk: true, sealOk: true, tireOk: true, progress: 100 },
  { bayNo: 'Bay 06', zone: '의왕 1터미널', truckPlate: 'EMPTY', driver: '-', cargo: '-', status: 'VACANT', weightOk: true, sealOk: true, tireOk: true, progress: 0 }
];

// REST APIs
app.get('/api/dispatches', (req, res) => {
  res.json({ success: true, count: dispatches.length, data: dispatches });
});

app.post('/api/dispatches', (req, res) => {
  const newDispatch = {
    id: `DISP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    shipper: req.body.shipper || '카카오 T 화물 화주',
    pickUp: req.body.pickUp || '서울 금천구 가산디지털1로',
    dropOff: req.body.dropOff || '부산 해운대구 수영강변대로',
    cargoType: req.body.cargoType || '일반 규격 화물',
    tonnage: req.body.tonnage || '5톤 윙바디',
    weightTon: parseFloat(req.body.weightTon) || 4.5,
    fee: parseInt(req.body.fee) || 350000,
    status: 'SEARCHING',
    driverName: null,
    driverPhone: null,
    truckPlate: null,
    dockingBay: null,
    requestedTime: req.body.requestedTime || '2026-08-13 14:00',
    distanceKm: parseInt(req.body.distanceKm) || 180,
    urgent: !!req.body.urgent,
    tCheckStatus: 'PENDING',
    createdAt: new Date().toISOString()
  };
  dispatches.unshift(newDispatch);
  res.status(201).json({ success: true, data: newDispatch });
});

app.patch('/api/dispatches/:id', (req, res) => {
  const { id } = req.params;
  const index = dispatches.findIndex(d => d.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Dispatched order not found' });
  }
  dispatches[index] = { ...dispatches[index], ...req.body };
  res.json({ success: true, data: dispatches[index] });
});

app.get('/api/geofences', (req, res) => {
  res.json({ success: true, zones: geofenceZones });
});

app.get('/api/t-check', (req, res) => {
  res.json({ success: true, bays: dockingBays });
});

app.post('/api/t-check/verify', (req, res) => {
  const { bayNo, weightOk, sealOk, tireOk, driverSignature } = req.body;
  const bay = dockingBays.find(b => b.bayNo === bayNo);
  if (bay) {
    bay.weightOk = weightOk !== undefined ? weightOk : true;
    bay.sealOk = sealOk !== undefined ? sealOk : true;
    bay.tireOk = tireOk !== undefined ? tireOk : true;
    bay.status = (bay.weightOk && bay.sealOk && bay.tireOk) ? 'PASSED' : 'REJECTED';
    bay.progress = 100;
  }
  res.json({ success: true, message: 'T-Check Verification Recorded', bay });
});

app.post('/api/voice-radar/search', (req, res) => {
  const { queryText } = req.body;
  const query = (queryText || '').toLowerCase();
  
  // Filter dispatches based on voice command keywords
  const matched = dispatches.filter(d => {
    if (d.status !== 'SEARCHING') return false;
    if (query.includes('5톤') && !d.tonnage.includes('5톤')) return false;
    if (query.includes('11톤') && !d.tonnage.includes('11톤')) return false;
    if (query.includes('25톤') && !d.tonnage.includes('25톤')) return false;
    if (query.includes('부산') && !(d.dropOff.includes('부산') || d.pickUp.includes('부산'))) return false;
    if (query.includes('이천') && !(d.dropOff.includes('이천') || d.pickUp.includes('이천'))) return false;
    if (query.includes('평택') && !(d.dropOff.includes('평택') || d.pickUp.includes('평택'))) return false;
    if (query.includes('급송') && !d.urgent) return false;
    return true;
  });

  res.json({
    success: true,
    query: queryText,
    matchedCount: matched.length > 0 ? matched.length : dispatches.filter(d => d.status === 'SEARCHING').length,
    results: matched.length > 0 ? matched : dispatches.filter(d => d.status === 'SEARCHING'),
    aiVoiceResponse: matched.length > 0 
      ? `음성 레이더 탐지 완료! 조건에 맞는 ${matched.length}건의 화물 오더가 매칭되었습니다.` 
      : '현재 조건에 맞는 탐지 결과가 없어, 추천 배차 목록 전체를 불러왔습니다.'
  });
});

app.get('/api/analytics', (req, res) => {
  res.json({
    success: true,
    summary: {
      totalDispatchesToday: 148,
      completedToday: 124,
      inTransitToday: 18,
      totalVolumeTons: 1240.5,
      revenueTodayKrw: 52400000,
      tCheckPassRate: '98.4%',
      avgGeofenceWaitTimeMin: 14
    },
    weeklyVolume: [
      { day: '월', volumeTons: 1120, revenue: 46000000 },
      { day: '화', volumeTons: 1340, revenue: 54000000 },
      { day: '수', volumeTons: 1240, revenue: 52400000 },
      { day: '목', volumeTons: 1410, revenue: 58000000 },
      { day: '금', volumeTons: 1580, revenue: 67000000 },
      { day: '토', volumeTons: 890, revenue: 38000000 },
      { day: '일', volumeTons: 420, revenue: 19000000 }
    ]
  });
});

// Serve Vite production build output
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback to index.html for React SPA Router
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Kakao T Freight server listening on http://0.0.0.0:${PORT}`);
});

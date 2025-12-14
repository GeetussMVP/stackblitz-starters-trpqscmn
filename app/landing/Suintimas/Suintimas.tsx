"use client";

import { MapPin, Truck } from "lucide-react";
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import lithuaniaGeoJSON from '../../data/map/lt.json';
import estoniaGeoJSON from '../../data/map/ee.json';
import latviaGeoJSON from '../../data/map/lv.json';
import polandGeoJSON from '../../data/map/pl.json';

export default function Suintimas() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <DeliveryMap />
    </div>
  );
}

function DeliveryMap() {
  const countries = ["Lietuva", "Latvija", "Estija", "Lenkija"];

  return (
    <section className="w-full py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* TEXT */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4">
              Pristatome <span className="text-blue-300">visose Baltijos šalyse</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-6">
              Greitas, patikimas pristatymas Lietuvoje, Latvijoje, Estijoje ir Lenkijoje.
            </p>
            <div className="space-y-3">
              {countries.map((name) => (
                <div
                  key={name}
                  className="flex items-center gap-4 text-white/90 hover:text-white transition-colors"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                  <span className="text-base font-light">{name}</span>
                  <MapPin className="w-4 h-4 ml-auto text-blue-300" />
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3 text-white/60">
              <Truck className="w-5 h-5" />
              <span className="text-sm font-light">Pristatymas per 24–48 valandas</span>
            </div>
          </div>

          {/* MAP */}
          <div>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-3xl" />
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
                <div className="w-full h-[380px] bg-slate-800/50">
                  <Map />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = L.map(mapContainer.current).setView([55.5, 23.5], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    L.geoJSON(lithuaniaGeoJSON as GeoJSON.FeatureCollection, {
      style: {
        color: '#2563eb',
        weight: 2,
        fillColor: '#3b82f6',
        fillOpacity: 0.3,
      },
      onEachFeature: (feature, layer) => {
        layer.bindPopup('<strong>Lithuania</strong>');
      },
    }).addTo(map.current);

    L.geoJSON(estoniaGeoJSON as GeoJSON.FeatureCollection, {
      style: {
        color: '#059669',
        weight: 2,
        fillColor: '#10b981',
        fillOpacity: 0.3,
      },
      onEachFeature: (feature, layer) => {
        layer.bindPopup('<strong>Estonia</strong>');
      },
    }).addTo(map.current);

    L.geoJSON(latviaGeoJSON as GeoJSON.FeatureCollection, {
      style: {
        color: '#dc2626',
        weight: 2,
        fillColor: '#ef4444',
        fillOpacity: 0.3,
      },
      onEachFeature: (feature, layer) => {
        layer.bindPopup('<strong>Latvia</strong>');
      },
    }).addTo(map.current);

    L.geoJSON(polandGeoJSON as GeoJSON.FeatureCollection, {
      style: {
        color: '#ea580c',
        weight: 2,
        fillColor: '#f97316',
        fillOpacity: 0.3,
      },
      onEachFeature: (feature, layer) => {
        layer.bindPopup('<strong>Poland</strong>');
      },
    }).addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return <div ref={mapContainer} className="w-full h-full" />;
}
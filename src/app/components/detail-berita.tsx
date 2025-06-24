'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { berita } from '../types'
import Image from 'next/image'

const BeritaDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [berita, setBerita] = useState<berita | null>(null)
  const [loading, setLoading] = useState(true)

  const formatTanggal = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }
    return new Date(dateString).toLocaleDateString('id-ID', options)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/berita/${id}`)
        const data = await res.json()
        setBerita(data[0])
      } catch (error) {
        console.error('Gagal mengambil data berita:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchData()
  }, [id])

  if (loading) return <p className="text-center">Memuat...</p>
  if (!berita) return <p className="text-center">Berita tidak ditemukan</p>

  return (
    <section className="w-full py-6 lg:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6">
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-[12px] text-sm">
              <div className="flex flex-col gap-2">
                <h1 className="text-lg font-semibold">{berita.judul}</h1>
                <span className="text-muted-foreground text-xs">
                  {formatTanggal(berita.waktu_publish)}
                </span>
              </div>

              {berita.cover && (
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={berita.cover}
                    alt={berita.judul}
                    className="w-full h-auto rounded-md"
                    width={800}
                    height={450}
                  />
                </div>
              )}

              <div
                className="prose max-w-none prose-sm"
                dangerouslySetInnerHTML={{ __html: berita.deskripsi }}
              />

              {berita.filename && (
                <div className="mt-4">
                  <video
                    controls
                    className="w-full max-h-[400px] rounded-lg border"
                  >
                    <source src={berita.filename} type="video/mp4" />
                    Browser Anda tidak mendukung pemutar video.
                  </video>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BeritaDetail

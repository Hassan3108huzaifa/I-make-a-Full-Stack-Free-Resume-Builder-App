'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Share2, Download } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function DownloadButtons({ resumeData }: { resumeData: any }) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async (format: 'png' | 'pdf') => {
    setIsDownloading(true)
    const element = document.getElementById('resume-content')
    if (element) {
      try {
        // Create a clone of the resume content
        const clone = element.cloneNode(true) as HTMLElement

        // Create a container for the clone
        const container = document.createElement('div')
        container.appendChild(clone)

        // Style the container
        Object.assign(container.style, {
          position: 'fixed',
          top: '0',
          left: '0',
          width: `${element.offsetWidth}px`,
          height: `${element.offsetHeight}px`,
          overflow: 'hidden',
          zIndex: '-1',
          background: 'white'
        })

        // Temporarily append the container to the body
        document.body.appendChild(container)

        // Force layout recalculation
        void container.offsetHeight

        // Use html2canvas on the clone
        const canvas = await html2canvas(clone, {
          scale: 2,
          useCORS: true,
          logging: false,
          allowTaint: true,
          foreignObjectRendering: true,
          windowWidth: element.scrollWidth,
          windowHeight: element.scrollHeight,
          ignoreElements: (element) => {
            // Ignore any elements that might be causing issues
            return element.id === 'some-problematic-element-id'
          },
          onclone: (clonedDoc) => {
            // Additional modifications to the cloned document if needed
            Array.from(clonedDoc.getElementsByTagName('*')).forEach((el) => {
              if (el instanceof HTMLElement) {
                el.style.transformOrigin = 'top left'
                el.style.transform = 'scale(1)'
              }
            })
          }
        })

        // Remove the container from the body
        document.body.removeChild(container)

        if (format === 'png') {
          const image = canvas.toDataURL("image/png", 1.0)
          const link = document.createElement('a')
          link.href = image
          link.download = `${resumeData.resumeData.name}_resume.png`
          link.click()
        } else if (format === 'pdf') {
          const imgData = canvas.toDataURL('image/jpeg', 1.0);

          // Custom page size in points (e.g., 400px x 600px)
          const customWidth = 600; // Adjust as per your need
          const customHeight = 600; // Adjust as per your need

          const pdf = new jsPDF('portrait', 'pt', [customWidth, customHeight]);

          // Scale the canvas content to fit within the custom page size
          const scale = Math.min(customWidth / canvas.width, customHeight / canvas.height);

          // Center the content on the PDF page
          const xOffset = (customWidth - canvas.width * scale) / 2;
          const yOffset = (customHeight - canvas.height * scale) / 2;

          pdf.addImage(imgData, 'JPEG', xOffset, yOffset, canvas.width * scale, canvas.height * scale);
          pdf.save(`${resumeData.resumeData.name}_resume.pdf`);
        }
      } catch (error) {
        console.error("Error generating resume image:", error)
        alert("An error occurred while generating the resume. Please try again.")
      }
    }
    setIsDownloading(false)
  }

  const handleShare = () => {
    const currentUrl = window.location.href
    navigator.clipboard.writeText(currentUrl).then(() => {
      alert("Resume link copied to clipboard!")
    }, (err) => {
      console.error('Could not copy text: ', err)
      alert("Failed to copy resume link. Please try again.")
    })
  }

  return (
    <div className="flex space-x-2">
      <Button onClick={() => handleDownload('png')} disabled={isDownloading} aria-label="Download as PNG">
        <Download className="mr-2 h-4 w-4" /> PNG
      </Button>
      <Button onClick={() => handleDownload('pdf')} disabled={isDownloading} aria-label="Download as PDF">
        <Download className="mr-2 h-4 w-4" /> PDF
      </Button>
      <Button onClick={handleShare} aria-label="Share resume link">
        <Share2 className="mr-2 h-4 w-4" /> Share
      </Button>
    </div>
  )
}
<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\PickupSchedule;

class PickupScheduledNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $pickupSchedule;

    /**
     * Create a new message instance.
     */
    public function __construct(PickupSchedule $pickupSchedule)
    {
        $this->pickupSchedule = $pickupSchedule;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Scheduled Pickup Notification',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.scheduled-pickup',
        );
    }
    /**
     * Build the message.
     *
     * 
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.scheduled-pickup')
                    ->with([
                        'listingTitle' => $this->pickupSchedule->listing->title,
                        'listingId' => $this->pickupSchedule->listing->id,
                        'scheduledBy' => $this->pickupSchedule->user->name,
                    ])
                    ->subject('Listing Scheduled for Pickup');
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}

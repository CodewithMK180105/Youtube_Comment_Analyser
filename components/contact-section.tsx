import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ContactSection() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Get In Touch</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>

          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input placeholder="First Name" />
                  </div>
                  <div className="space-y-2">
                    <Input placeholder="Last Name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Input placeholder="Email" type="email" />
                </div>
                <div className="space-y-2">
                  <Textarea placeholder="Your Message" className="min-h-[120px]" />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

